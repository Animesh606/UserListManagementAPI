// routes/userRoutes.js
import { Router } from 'express';
import multer from 'multer';
import { uploadUsers } from '../controllers/user.controller.js';
import upload from '../services/multer.service.js'

const router = Router();

router.post('/:listId/upload', upload.single('file'), uploadUsers);

export default router;
