import supabase from '../config/supabaseClient.js';

export const linkParent = async (req, res) => {
  const { junior_id, parent_id, junior_name } = req.body;

  if (!junior_id || !parent_id || !junior_name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const { data, error } = await supabase
      .from('juniors')
      .upsert([{ junior_id, parent_id, junior_name }], { onConflict: 'junior_id' });

    if (error) throw error;

    res.json({ message: 'Junior linked to parent successfully', data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};