// routes/listRoutes.js
import { Router } from 'express';
import { createList } from '../controllers/list.controller.js';

const router = Router();

router.post('/', createList);

export default router;
