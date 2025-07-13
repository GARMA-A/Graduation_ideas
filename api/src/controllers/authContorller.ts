import { Response, Request } from 'express';

const signup = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;

		// Validate input
		if (!username || !password) {
			return res.status(400).json({ message: 'Username and password are required' });
		}

		// Here you would typically hash the password and save the user to the database
		// For demonstration, we'll just return a success message
		res.status(201).json({ message: 'User created successfully', user: { username } });
	} catch (error) {
		console.error('Error during signup:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}


export { signup };
