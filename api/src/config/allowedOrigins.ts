import dotenv from 'dotenv';
dotenv.config();

export const allowedOrigins: string[] = process.env.ALLOW_ORIGIN!.split(',').map(origin => origin.trim());
