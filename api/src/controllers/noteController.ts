import { Notes } from '../models/Notes';
import { Response, Request } from 'express';


const getAllNotes = async (_: Request, res: Response) => {
	try {
		const notes = await Notes.find();
		res.status(200).json(notes);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching notes', error });
	}
}


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
