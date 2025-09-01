import dotenv from 'dotenv';
dotenv.config();

export const allowedOrigins: string[] = process.env.ALLOW_ORIGIN 
	? process.env.ALLOW_ORIGIN.split(',').map(origin => origin.trim())
	: ['http://localhost:5173', 'http://localhost:3000', 'https://localhost:3000'];
