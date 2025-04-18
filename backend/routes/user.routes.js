import { registerUser, loginUser, getUser, updateProfile, changePassword } from '../controllers/user.controller.js';
import express from 'express';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/get', getUser);
router.put('/update', updateProfile);
router.put('/change', changePassword);

export default router;
