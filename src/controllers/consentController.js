import QRCode from 'qrcode';

export const requestParentLink = async (req, res) => {
  const { junior_id, action_type } = req.body;

  if (!junior_id || !['top-up', 'transfer'].includes(action_type)) {
    return res.status(400).json({ error: 'Missing or invalid fields' });
  }

  const approvalUrl = `https://monesave.app/parent-approval?junior_id=${junior_id}&action=${action_type}`;

  try {
    const qrCodeDataUrl = await QRCode.toDataURL(approvalUrl);

    res.json({
      approvalLink: approvalUrl,
      qrCode: qrCodeDataUrl,
      androidLink: 'https://play.google.com/store/apps/details?id=com.mycompany.monesave&pcampaignid=web_share',
      iosLink: 'https://apps.apple.com/ng/app/orukka-by-monesave-ring-app/id6480351864',
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
};