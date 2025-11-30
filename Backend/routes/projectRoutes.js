const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  createProject,
  getAllProjects,
  getProjectById,
  deleteProject,
  addEndpoint,
  deleteEndpoint,
  editEndpoint,
  saveTestHistory,
  shareProject,
  removeSharedProject,
  getShareUser
} = require('../controllers/projectController');

router.post('/', protect, createProject);
router.get('/',  protect, getAllProjects);
router.get('/:id', protect, getProjectById);
router.delete('/:id', protect, deleteProject);
router.post("/:id/endpoints", protect, addEndpoint);
router.delete("/:id/endpoints/:index", protect, deleteEndpoint);
router.put("/:id/endpoints/:index", protect, editEndpoint);
router.post("/:id/endpoints/:index/history", protect, saveTestHistory);
router.post("/:id/share", protect, shareProject);
router.delete("/:id/share", protect, removeSharedProject);
router.get("/:id/share", protect, getShareUser);





module.exports = router;
