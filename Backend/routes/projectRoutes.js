const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  createProject,
  getAllProjects,
  getProjectById,
  deleteProject
} = require('../controllers/projectController');

router.post('/', protect, createProject);
router.get('/',  protect, getAllProjects);
router.get('/:id', protect, getProjectById);
router.delete('/:id', protect, deleteProject);

module.exports = router;
