import express from 'express';
import { linkParent } from '../controllers/juniorController.js';

const router = express.Router();

router.post('/link-parent', linkParent);

export default router;
