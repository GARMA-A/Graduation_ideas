import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
	try {
		if (!process.env.MONGO_URI) {
			console.warn('MongoDB URI not provided - running without database connection');
			return;
		}
		await mongoose.connect(process.env.MONGO_URI);
		console.log('MongoDB connection established');
	} catch (error) {
		console.error('MongoDB connection error:', error);
		// Don't exit in production/serverless environment
		if (process.env.NODE_ENV !== 'production') {
			process.exit(1);
		}
	}
};


export default connectDB;
