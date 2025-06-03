import supabase from '../config/supabaseClient.js';

export const createConsentRequest = async (req, res) => {
  const { junior_id, parent_id, type } = req.body;

  if (!junior_id || !parent_id || !type) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const { data, error } = await supabase
      .from('parental_consents')
      .insert([{ junior_id, parent_id, type }]);

    if (error) throw error;

    res.json({ message: 'Consent request created', data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
