import express from 'express';
import { getQuickBooksAuthUrl, handleQuickBooksCallback } from '../controllers/quickbooksController.js';

const router = express.Router();

router.get('/connect', getQuickBooksAuthUrl); // Step 1: Redirect user to QuickBooks
router.get('/callback', handleQuickBooksCallback); // Step 2: Handle QuickBooks OAuth callback

export default router;