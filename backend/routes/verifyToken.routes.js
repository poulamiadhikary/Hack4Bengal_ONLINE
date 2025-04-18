import express from 'express';
import { verifyToken } from '../controllers/verifyToken.js';

const router = express.Router();

router.get('/verify-token', verifyToken);

export default router;