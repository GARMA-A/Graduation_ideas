import { JwtPayload } from 'jsonwebtoken';

export interface MyJwtPayload extends JwtPayload {
	userInfo: {
		id: string;
	};
}
