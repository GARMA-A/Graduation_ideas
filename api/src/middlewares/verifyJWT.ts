import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';


const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
	const token = req.cookies?.accessToken;
	if (!token) {
		return res.status(401).json({ message: 'No access token provided' });
	}
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string,
		(err: jwt.VerifyErrors | null, decoded: string | JwtPayload | undefined) => {
			if (err) {
				return res.status(403).json({ message: 'invalid or expired access token' });
			}
			const payload = decoded as JwtPayload;
			req.userId = payload.userInfo.id;
			next();
		}
	);

}

export { verifyJWT };
