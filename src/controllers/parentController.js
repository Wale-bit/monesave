import supabase from '../config/supabaseClient.js';

export const linkJuniorToParent = async (req, res) => {
  const { junior_id, parent_id } = req.body;

  const { error } = await supabase
    .from('juniors')
    .update({ parent_id })
    .eq('junior_id', junior_id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ message: 'Junior successfully linked to parent.' });
};
