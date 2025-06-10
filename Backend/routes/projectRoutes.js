const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  createProject,
  getAllProjects,
  getProjectById,
  deleteProject,
  addEndpoint,
  deleteEndpoint
} = require('../controllers/projectController');

router.post('/', protect, createProject);
router.get('/',  protect, getAllProjects);
router.get('/:id', protect, getProjectById);
router.delete('/:id', protect, deleteProject);
router.post("/:id/endpoints", protect, addEndpoint);
router.delete("/:id/endpoints/:index", protect, deleteEndpoint);



module.exports = router;
