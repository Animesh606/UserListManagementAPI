// routes/userRoutes.js
import { Router } from 'express';
import multer from 'multer';
import { uploadUsers } from '../controllers/user.controller.js';

const router = Router();
const upload = multer({ dest: '/src/uploads/' });

router.post('/:listId/upload', upload.single('file'), uploadUsers);

export default router;
