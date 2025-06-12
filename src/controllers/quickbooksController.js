import pkg from 'node-quickbooks';
const { QuickBooks } = pkg;

const clientId = process.env.QB_CLIENT_ID;
const clientSecret = process.env.QB_CLIENT_SECRET;
const redirectUri = process.env.QB_REDIRECT_URI;

export const getQuickBooksAuthUrl = (req, res) => {
  const scopes = [
    'com.intuit.quickbooks.accounting',
  ];
  const baseAuthUrl = 'https://appcenter.intuit.com/connect/oauth2';
  const authUrl = baseAuthUrl +
    `?client_id=${clientId}&scope=${scopes.join('%20')}&redirect_uri=${redirectUri}&response_type=code&state=secureRandomState`;
  res.redirect(authUrl);
};

export const handleQuickBooksCallback = async (req, res) => {
  const { code, realmId } = req.query;

  res.send('QuickBooks connected! You can now sync your data.');
};