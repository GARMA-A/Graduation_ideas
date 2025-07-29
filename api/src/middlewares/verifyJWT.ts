import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
	const header = req.headers['authorization'] || req.headers['Authorization'] as string | undefined;
	if (!header?.startsWith('Bearer ')) {
		return res.status(401).json({ message: 'Invalid authorization header format' });
	}
	const token = header.split(' ')[1];
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string,
		(err, decoded) => {
			if (err) {
				return res.status(403).json({ message: 'Failed to authenticate token' });
			}
			const payload = decoded as JwtPayload;
			req.userId = payload.userInfo.id;
			next();
		}
	);

}

export { verifyJWT };
