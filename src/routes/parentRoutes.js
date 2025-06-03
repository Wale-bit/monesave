import express from 'express';
import { getPendingConsents, updateConsentStatus } from '../controllers/parentController.js';

const router = express.Router();

router.get('/pending/:parent_id', getPendingConsents);
router.post('/approve', updateConsentStatus);

export default router;
