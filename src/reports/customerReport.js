import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import supabase from '../config/supabaseClient.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateCustomerReport = async () => {
  

 
  const { data: profiles, error } = await supabase
  .from('profiles')
  .select('*');

  if (error) throw error;

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Customer Balances');

  sheet.columns = [
    { header: 'First Name', key: 'first_name' },
    { header: 'Last Name', key: 'last_name' },
    { header: 'Country', key: 'country' },
    { header: 'Currency', key: 'currency' },
    { header: 'Local Balance', key: 'local_balance' },
    { header: 'MONC', key: 'calculated_monc' },
  ];

  profiles.forEach(profile => {
    sheet.addRow(profile);
  });

  const reportsDir = path.resolve(__dirname, '../../reports');
  const filePath = path.join(reportsDir, 'customer_report.xlsx');

  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  await workbook.xlsx.writeFile(filePath);
  console.log(`✅ Customer report saved at: ${filePath}`);
};