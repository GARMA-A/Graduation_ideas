import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI!);

mongoose.connection.once('open', () => {
	console.log('MongoDB connection established');
	app.listen(process.env.PORT, () => {

		console.log('Server is running on port 5000');
	}
	);

});
mongoose.connection.on('error', (err) => {
	console.error('MongoDB connection error:', err);
});


