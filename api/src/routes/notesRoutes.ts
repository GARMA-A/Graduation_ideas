import express from 'express';
import { getAllNotes, getNoteById, updateNote, deleteNote, createNote } from '../controllers/noteController';


const router = express.Router();


router.route("/getAll").get(getAllNotes);

router.route("/:id").get(getNoteById);

router.route("/update/:id").put(updateNote);

router.route("/delete/:id").delete(deleteNote);

router.route("/create").post(createNote);

export default router;




