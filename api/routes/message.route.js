import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { sendMessage, getMessages } from '../controllers/message.controller.js';

const router = express.Router();

router.get('/:id', verifyToken, getMessages);
router.post('/send/:id', verifyToken, sendMessage);


export default router;