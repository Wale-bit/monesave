import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ringRoutes from './src/routes/ringRoutes.js';
import consentRoutes from './src/routes/consentRoutes.js';
import parentRoutes from './src/routes/parentRoutes.js';
import quickbooksRoutes from './src/routes/quickbooksRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use('/api/consent', consentRoutes);
app.use('/api/parents', parentRoutes);
app.use('/api/ring', ringRoutes);
app.use('/quickbooks', quickbooksRoutes);




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
