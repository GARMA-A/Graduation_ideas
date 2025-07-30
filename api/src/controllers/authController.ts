import { Response, Request } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';


const register = async (req: Request, res: Response) => {
	try {
		const { username, password, email, rememberMe } = req.body;
		if (!username || !password || !email || !email.includes('@') || !email.includes('.') || password.length < 6) {
			return res.status(400).json({
				message: 'Username, password, and valid email are required.Password must be at least 6 characters.'
			});
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

		const expirationTime = rememberMe ? '30d' : '3d';

		const refreshToken = jwt.sign({
			userInfo: {
				id: newUser._id,
			}
		}, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: expirationTime });


		try {
			await newUser.save();
			res.status(201).json({ message: 'User created successfully', user: newUser.email });
		} catch (error) {
			console.error('Error saving user:', error);
			return res.status(500).json({ message: 'Internal server error' });
		}

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			maxAge: 7 * 24 * 60 * 60 * 1000,
			sameSite: 'none',
			secure: true,
		});
		res.cookie('accessToken', accessToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'none',
			maxAge: 30 * 60 * 1000,
		});
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

		const expirationTime = user.rememberMe ? '30d' : '3d';

		const refreshToken = jwt.sign({
			userInfo: {
				id: user._id,
			}
		}, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: expirationTime });

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			maxAge: 7 * 24 * 60 * 60 * 1000,
			sameSite: 'none',
			secure: true,
		});
		res.cookie('accessToken', accessToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'none',
			maxAge: 30 * 60 * 1000,
		});

		res.status(200).json({ message: 'Login successful', user: user.email });
	} catch (error) {
		console.error('Error during login:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}


const refreshToken = async (req: Request, res: Response) => {
	const cookies = req.cookies;
	const refreshTokenCookie = cookies?.refreshToken;
	if (!refreshTokenCookie) {
		return res.status(401).json({ message: 'No refresh token found' });
	}
	jwt.verify(
		refreshTokenCookie,
		process.env.REFRESH_TOKEN_SECRET as string,
		(err: jwt.VerifyErrors | null, decoded: string | JwtPayload | undefined) => {
			if (err || !decoded || typeof decoded === 'string') {
				return res.status(403).json({ message: 'Invalid refresh token' });
			}

			const payload = decoded as JwtPayload;
			const userId = payload.userInfo.id;

			const newAccessToken = jwt.sign(
				{ userInfo: { id: userId } },
				process.env.ACCESS_TOKEN_SECRET as string,
				{ expiresIn: '30m' }
			);

			res.cookie('accessToken', newAccessToken, {
				httpOnly: true,
				secure: true,
				sameSite: 'none',
				maxAge: 30 * 60 * 1000,
			});
			res.status(200).json({ message: 'Access token refreshed' });
		}
	);
}


const logout = async (_: Request, res: Response) => {
	try {
		res.clearCookie('refreshToken', {
			httpOnly: true,
			sameSite: 'none',
			secure: true,
		});
		res.clearCookie('accessToken', {
			httpOnly: true,
			sameSite: 'none',
			secure: true,
		});
		res.status(200).json({ message: 'Logout successful' });
	} catch (error) {
		console.error('Error during logout:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}





export { register, login, refreshToken, logout };
