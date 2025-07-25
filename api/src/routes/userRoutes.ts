import express from 'express';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/userController';

const router = express.Router();



router.route("/getAll").get(getAllUsers);

router.route("/:id").get(getUserById);

router.route("/create").post(createUser);

router.route("/update/:id").put(updateUser);

router.route("/delete/:id").delete(deleteUser);

export default router;



