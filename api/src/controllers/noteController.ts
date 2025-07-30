import { Notes } from '../models/Notes';
import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';


const getAllNotes = async (req: Request, res: Response) => {
	try {
		const token = req.cookies.accessToken;
		if (!token) {
			return res.status(401).json({ message: 'Access token missing' });
		}
		let decoded: jwt.JwtPayload | { userInfo: { id: string } } | string;
		try {
			decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as { userInfo: { id: string } };
		} catch (err) {
			return res.status(403).json({ message: 'Invalid access token', error: err });
		}
		const userId = decoded.userInfo?.id;
		if (!userId) {
			return res.status(403).json({ message: 'Invalid token payload' });
		}
		const notes = await Notes.find({ userId: userId });
		res.status(200).json(notes);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching notes', error });
	}
}

// this end point is not used my the client side app
const getNoteById = async (req: Request, res: Response) => {
	try {

		const noteId = req.params.id;
		const note = await Notes.findById(noteId);
		if (!note) {
			return res.status(404).json({ message: 'Note not found' });
		}
		res.status(200).json(note);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching note', error });
	}
}

const createNote = async (req: Request, res: Response) => {
	try {
		const token = req.cookies.accessToken;
		if (!token) {
			return res.status(401).json({ message: 'Access token missing' });
		}
		let decoded: jwt.JwtPayload | { userInfo: { id: string } } | string;
		try {
			decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as { userInfo: { id: string } };
		} catch (err) {
			return res.status(403).json({ message: 'Invalid access token', error: err });
		}
		const userId = decoded.userInfo?.id;
		if (!userId) {
			return res.status(403).json({ message: 'Invalid token payload' });
		}
		req.body.userId = userId;
		const newNote = new Notes(req.body);
		await newNote.save();
		res.status(201).json(newNote);
	} catch (error) {
		res.status(500).json({ message: 'Error creating note', error });
	}
}

const updateNote = async (req: Request, res: Response) => {
	try {
		const noteId = req.params.id;
		if (!noteId) {
			return res.status(400).json({ message: 'Note ID is required' });
		}
		const updatedNote = await Notes.findByIdAndUpdate(noteId, req
			.body, { new: true });
		if (!updatedNote) {
			return res.status(404).json({ message: 'Note not found' });
		}
		res.status(200).json(updatedNote);
	}
	catch (error) {
		res.status(500).json({ message: 'Error updating note', error });
	}
}

const deleteNote = async (req: Request, res: Response) => {
	try {
		const noteId = req.params.id;
		const deletedNote = await Notes.findByIdAndDelete(noteId);
		if (!deletedNote) {
			return res.status(404).json({ message: 'Note not found' });
		}
		res.status(200).json({ message: 'Note deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: 'Error deleting note', error });
	}
}

const toggleFavorite = async (req: Request, res: Response) => {
	try {
		const noteId = req.params.id;
		const note = await Notes.findById(noteId);
		if (!note) {
			return res.status(404).json({ message: 'Note not found' });
		}
		note.favorite = !note.favorite;
		await note.save();
		res.status(200).json(note);
	} catch (error) {
		res.status(500).json({ message: 'Error toggling favorite', error });
	}
}



export { getAllNotes, getNoteById, createNote, updateNote, deleteNote, toggleFavorite };
