import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { corsOptions } from './config/corsOptions';
import connectDB from './config/dbconnect'
import rootRoute from "./routes/root"
import notesRoute from './routes/notesRoutes';
import usersRoute from './routes/userRoutes';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());


app.use("/", rootRoute)

app.use('/api/notes', notesRoute);

app.use('/api/users', usersRoute);



mongoose.connection.once('open', () => {
	console.log('MongoDB connection established');
	app.listen(PORT, () => {

		console.log(`Server is running on port ${PORT}`);
	}
	);

});
mongoose.connection.on('error', (err) => {
	console.error('MongoDB connection error:', err);
});


