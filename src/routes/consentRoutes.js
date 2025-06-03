import express from 'express';
import { createConsentRequest } from '../controllers/consentController.js';

const router = express.Router();

router.post('/request', createConsentRequest);

export default router;
