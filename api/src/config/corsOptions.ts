import { allowedOrigins } from "./allowedOrigins";


export const corsOptions = {
	origin: (origin: string | undefined, callback: (err: Error | null, success?: boolean) => void) => {
		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
	credentials: true,
	optionsSuccessStatus: 204,
};
