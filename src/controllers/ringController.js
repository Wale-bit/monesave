import supabase from '../config/supabaseClient.js';

export const updateRingStatus = async (req, res) => {
  const user_id = 'LVsdraHErPTjDGaAB1GPe6J62GR2';
  const { status } = req.body;

  if (!['active', 'blocked'].includes(status)) {
    return res.status(400).json({ error: 'Invalid ring status value' });
  }

  try {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('profile_id')
      .eq('user_id', user_id)
      .single();

    if (profileError || !profile) {
      return res.status(404).json({ error: 'User profile not found' });
    }


    const { error: updateError } = await supabase
      .from('rings')
      .update({ status })
      .eq('profile_id', profile.profile_id);

    if (updateError) {
      return res.status(500).json({ error: 'Failed to update ring status' });
    }

    res.status(200).json({ message: `Ring successfully ${status === 'blocked' ? 'blocked' : 'unblocked'}` });
  } catch (err) {
    console.error('Error updating ring status:', err);
    res.status(500).json({ error: 'Server error' });
  }
};