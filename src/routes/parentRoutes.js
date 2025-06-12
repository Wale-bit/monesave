import express from 'express';
import { linkJuniorToParent } from '../controllers/parentController.js';

const router = express.Router();

router.post('/approve', linkJuniorToParent);

export default router;

