import express from 'express';
import { login, refreshToken, register } from '../controllers/authController';

const router = express.Router();


router.route('/register').post(register);
router.route('/login').post(login);
router.route('/refresh').get(refreshToken);

export default router;







