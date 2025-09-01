import express from 'express';

const router = express.Router();



export default router.get('/', (req, res) => {
	res.status(200).json({ message: 'Welcome to the API' });
});

