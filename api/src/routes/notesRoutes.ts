import express from 'express';
import { getAllNotes, getNoteById, updateNote, deleteNote, createNote, toggleFavorite } from '../controllers/noteController';
import { verifyJWT } from '../middlewares/verifyJWT';


const router = express.Router();

router.use(verifyJWT);

router.route("/getAll").get(getAllNotes);

router.route("/:id").get(getNoteById);

router.route("/update/:id").put(updateNote);

router.route("/delete/:id").delete(deleteNote);

router.route("/create").post(createNote);

router.route("/toggleFavorite/:id").put(toggleFavorite);

export default router;




