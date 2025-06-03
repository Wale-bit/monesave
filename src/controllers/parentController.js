import supabase from '../config/supabaseClient.js';

export const getPendingConsents = async (req, res) => {
  const { parent_id } = req.params;

  try {
    const { data, error } = await supabase
      .from('parental_consents')
      .select('*')
      .eq('parent_id', parent_id)
      .eq('status', 'pending');

    if (error) throw error;

    res.json({ pendingConsents: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateConsentStatus = async (req, res) => {
  const { consent_id, parent_id, approve } = req.body;

  if (!consent_id || !parent_id || typeof approve !== 'boolean') {
    return res.status(400).json({ error: 'Missing or invalid fields' });
  }

  try {
    const { data, error } = await supabase
      .from('parental_consents')
      .update({ status: approve ? 'approved' : 'rejected' })
      .eq('id', consent_id)
      .eq('parent_id', parent_id);

    if (error) throw error;

    res.json({ message: 'Consent request updated', data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
