import mailjet from 'node-mailjet';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

const mailjetClient = mailjet.apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_API_SECRET
);

export async function sendReportEmail({ to, subject, text }) {
  // Read attachments as base64
  const attachments = [
    {
      Filename: 'customer_report.xlsx',
      ContentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      Base64Content: fs.readFileSync('/Users/user/Desktop/Excel report/reports/customer_report.xlsx').toString('base64'),
    },
    {
      Filename: 'daily_transactions.xlsx',
      ContentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      Base64Content: fs.readFileSync('/Users/user/Desktop/Excel report/reports/daily_transactions.xlsx').toString('base64'),
    },
  ];

  await mailjetClient
    .post('send', { version: 'v3.1' })
    .request({
      Messages: [
        {
          From: {
            Email: process.env.EMAIL_USER,
            Name: 'Monesave Reports',
          },
          To: [
            { Email: process.env.FINANCE_EMAIL },
            { Email: process.env.SUPPORT_EMAIL }
          ],
          Subject: subject,
          TextPart: text,
          Attachments: attachments,
        },
      ],
    });
}