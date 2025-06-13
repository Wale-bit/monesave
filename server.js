import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ringRoutes from './src/routes/ringRoutes.js';
import consentRoutes from './src/routes/consentRoutes.js';
import parentRoutes from './src/routes/parentRoutes.js';
import quickbooksRoutes from './src/routes/quickbooksRoutes.js';
import { generateCustomerReport } from './src/reports/customerReport.js';
import { generateTransactionReport } from './src/reports/transactionReport.js';
import { sendReportEmail } from './src/email/sendEmail.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use('/api/consent', consentRoutes);
app.use('/api/parents', parentRoutes);
app.use('/api/ring', ringRoutes);
app.use('/quickbooks', quickbooksRoutes);

await generateCustomerReport();
await generateTransactionReport();

await sendReportEmail({
  to: process.env.FINANCE_EMAIL,
  subject: 'Daily Report',
  text: 'Daily Report for Monesave',
  attachments: [
    {
      filename: 'customer_report.xlsx',
      path: '/Users/user/Desktop/Excel report/reports/customer_report.xlsx',
    },
    {
      filename: 'daily_transactions.xlsx',
      path: '/Users/user/Desktop/Excel report/reports/daily_transactions.xlsx',
    },
  ],
});

console.log('✅ All reports generated successfully.');
console.log('✅ Email sent successfully!');


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
