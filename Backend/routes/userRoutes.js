const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { getProfile, updateProfile } = require('../controllers/userController');

// current user profile
router.get('/me', protect, getProfile);

// update profile
router.patch('/me', protect, updateProfile);

module.exports = router;
