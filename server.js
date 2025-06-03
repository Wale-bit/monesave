import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ringRoutes from './src/routes/ringRoutes.js';
import juniorRoutes from './src/routes/juniorRoutes.js';
import consentRoutes from './src/routes/consentRoutes.js';
import parentRoutes from './src/routes/parentRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use('/junior', juniorRoutes);
app.use('/consent', consentRoutes);
app.use('/parent', parentRoutes);
app.use('/api/ring', ringRoutes);




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
