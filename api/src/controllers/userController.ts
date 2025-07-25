import { User } from '../models/User';
import { Response, Request } from 'express';


export const getAllUsers = async (_: Request, res: Response) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching users', error });
	}
}

export const getUserById = async (req: Request, res: Response) => {
	const userId = req.params.id;
	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.status(200).json(user);

	} catch (error) {
		res.status(500).json({ message: 'Error fetching user', error });
	}

}


export const createUser = async (req: Request, res: Response) => {
	try {
		const existingUser = await User.find({ email: req.body.email });
		if (existingUser.length > 0) {
			return res.status(400).json({ message: 'User with this email already exists' });
		}
		const newUser = new User(req.body);
		await newUser.save();
		res.status(201).json(newUser);

	} catch (error) {
		res.status(500).json({ message: 'Error creating user', error });

	}
}

export const updateUser = async (req: Request, res: Response) => {
	try {
		const userId = req.params.id;
		const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
		if (!updatedUser) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.status(200).json(updatedUser);

	} catch (error) {
		res.status(500).json({ message: 'Error updating user', error });

	}
}

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const userId = req.params.id;
		const deletedUser = await User.findByIdAndDelete(userId);
		if (!deletedUser) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.status(204).json({ message: 'User deleted successfully' });

	} catch (error) {
		res.status(500).json({ message: 'Error deleting user', error });
	}
}

