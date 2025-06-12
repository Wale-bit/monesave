import express from 'express';
import { requestParentLink } from '../controllers/consentController.js';

const router = express.Router();

router.post('/request-parent', requestParentLink);

export default router;
