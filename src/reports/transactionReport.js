import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import supabase from '../config/supabaseClient.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateTransactionReport = async () => {
  const today = new Date().toISOString().split('T')[0];



  const { data: ringData, error: ringError } = await supabase
    .from('ring_transaction')
    .select('first_name, last_name, date, time, amount, currency')

  if (ringError) throw ringError;

  const workbook = new ExcelJS.Workbook();
  const ringSheet = workbook.addWorksheet('Ring Transactions');

  const columns = [
    { header: 'First Name', key: 'first_name' },
    { header: 'Last Name', key: 'last_name' },
    { header: 'Date', key: 'date' },
    { header: 'Time', key: 'time' },
    { header: 'Amount', key: 'amount' },
    { header: 'Currency', key: 'currency' },
  ];




  ringSheet.columns = columns;
  ringData.forEach(row => ringSheet.addRow(row));


  const reportsDir = path.resolve(__dirname, '../../reports');
  const filePath = path.join(reportsDir, 'daily_transactions.xlsx');

  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  await workbook.xlsx.writeFile(filePath);
  console.log(`✅ Transaction report saved at: ${filePath}`);
};
