// Only simple profile endpoints for MVP
exports.getProfile = (req, res) => {
  res.status(200).json(req.user);           // req.user is set in authMiddleware
};

exports.updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = req.user;

    if (username) user.username = username;
    if (email)    user.email    = email;

    await user.save();
    res.status(200).json({ message: 'Profile updated', user });
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};
