const Project = require('../models/Project');

// POST /api/projects (protected)
exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const project = await Project.create({
      name,
      description,
      userId: req.user.id
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: 'Create project failed', error: err.message });
  }
};

// GET /api/projects (protected)
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user.id });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Fetch failed', error: err.message });
  }
};

// GET /api/projects/:id (protected)
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, userId: req.user.id });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ message: 'Fetch failed', error: err.message });
  }
};

// DELETE /api/projects/:id (protected)
exports.deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deleted) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
};

exports.addEndpoint = async (req, res) => {
  const { id } = req.params;
  const { method, path, description } = req.body;

  try {
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    project.endpoints.push({ method, path, description });
    await project.save();

    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ message: "Failed to add endpoint", error: err.message });
  }
};

exports.deleteEndpoint = async (req, res) => {
  const { id, index } = req.params;

  try {
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (!project.endpoints[index]) {
      return res.status(404).json({ message: "Endpoint not found" });
    }

    project.endpoints.splice(index, 1); // remove 1 item at the index
    await project.save();

    res.status(200).json({ message: "Endpoint deleted", project });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete endpoint", error: err.message });
  }
};

