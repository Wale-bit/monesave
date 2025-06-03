import express from 'express';
import { updateRingStatus } from '../controllers/ringController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.patch('/status', updateRingStatus);

export default router;
