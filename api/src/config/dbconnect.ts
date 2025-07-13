import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI!);
		console.log('MongoDB connection established');
	} catch (error) {
		console.error('MongoDB connection error:', error);
		process.exit(1); // Exit process with failure
	}
};


export default connectDB;
