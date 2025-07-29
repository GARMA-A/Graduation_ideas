import { Response, Request } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';

const register = async (req: Request, res: Response) => {
	try {
		const { username, password, email, rememberMe } = req.body;
		// Validate input
		if (!username || !password || !email || !email.includes('@') || !email.includes('.') || password.length < 6) {
			return res.status(400).json({ message: 'Username and password are required password must be more than 6 chars also valid email require' });
		}
		const user = await User.findOne({ email }).exec();
		if (user) {
			return res.status(400).json({ message: 'User with this email already exists' });
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({
			username,
			email,
			password: hashedPassword,
			rememberMe: rememberMe || false,
		});
		const accessToken = jwt.sign({
			userInfo: {
				id: newUser._id,
			}

		}, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "30m" });

		const refreshToken = jwt.sign({
			userInfo: {
				id: newUser._id,
			}
		}, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: `7d` });

		res.cookie('jwt', refreshToken, {
			httpOnly: true,
			maxAge: 7 * 24 * 60 * 60 * 1000,
			sameSite: false,
		});
		await newUser.save();
		res.status(201).json({ accessToken, message: 'User created successfully', user: newUser.email });
	} catch (error) {
		console.error('Error during signup:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ message: 'Email and password are required' });
		}
		const user = await User.findOne({ email }).exec();
		if (!user) {
			return res.status(401).json({ message: 'Invalid email or password' });
		}
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({ message: 'Invalid email or password' });
		}
		const accessToken = jwt.sign({
			userInfo: {
				id: user._id,
			}
		}, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "30m" });

		const refreshToken = jwt.sign({
			userInfo: {
				id: user._id,
			}
		}, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: `7d` });

		res.cookie('jwt', refreshToken, {
			httpOnly: true,
			maxAge: 7 * 24 * 60 * 60 * 1000,
			sameSite: false,
		});

		res.status(200).json({ accessToken, message: 'Login successful', user: user.email });
	} catch (error) {
		console.error('Error during login:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}


const refreshToken = async (req: Request, res: Response) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) {
		return res.status(401).json({ message: 'No refresh token found' });
	}
	const refreshToken = cookies.jwt;
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string,
		async (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
			if (err) {
				return res.status(403).json({ message: 'Failed to authenticate refresh token' });
			}
			const payload = decoded as JwtPayload;
			const userId = payload.userInfo.id;
			const foundUser = await User.findById(userId).exec();
			if (!foundUser) {
				return res.status(403).json({ message: 'User not found' });
			}
			const accessToken = jwt.sign({
				userInfo: {
					id: userId,
				}
			}, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "30m" });
			res.status(200).json({ accessToken, message: 'Refresh token successful' });
		});
}




export { register, login, refreshToken };
