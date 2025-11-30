const Project = require('../models/Project');
const User = require('../models/User');

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

exports.editEndpoint = async (req, res) => {
  const { id, index } = req.params;
  const { method, path, description } = req.body;

  try {
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (!project.endpoints[index]) {
      return res.status(404).json({ message: "Endpoint not found" });
    }

    // Update fields
    project.endpoints[index].method = method;
    project.endpoints[index].path = path;
    project.endpoints[index].description = description;

    await project.save();
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ message: "Failed to edit endpoint", error: err.message });
  }
};

exports.saveTestHistory = async (req, res) => {
  const { id, index } = req.params;
  const { status, responseBody } = req.body;

  try {
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const endpoint = project.endpoints[index];
    if (!endpoint) return res.status(404).json({ message: "Endpoint not found" });

    endpoint.history.push({ status, responseBody });
    await project.save();

    res.status(200).json({ message: "History saved" });
  } catch (err) {
    res.status(500).json({ message: "Failed to save history", error: err.message });
  }
};

exports.shareProject = async (req, res) => {
  const { email, permission } = req.body;
  const pid = req.params.id;
  try {
    
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: `User not found with ${email}` });

    const project = await Project.findById(pid);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (project.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to share this project" });
    }

    const alreadyShared = project.sharedWith.some(
      (entry) => entry.userId.toString() === user._id.toString()
    );
    if (alreadyShared) return res.status(400).json({ message: `Already shared with user ${email}` });

    project.sharedWith.push({ userId: user._id, permission });
    await project.save();

    res.status(200).json({ message: `Project shared successfully with ${email}` });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.removeSharedProject = async (req, res) => {
  const { email } = req.body;
  const pid = req.params.id;

  try {

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: `User not found with ${email}` });

    const project = await Project.findById(pid);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (project.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to remove shared access" });
    }

    const isShared = project.sharedWith.some(
      (entry) => entry.userId.toString() === user._id.toString()
    );
    if (!isShared) return res.status(400).json({ message: `Project is not shared with user ${email}` });

    project.sharedWith.pull({ userId: user._id });
    await project.save();

    res.status(200).json({ message: `Removed shared access for ${email}` });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getShareUser = async (req, res) => {
  const pid = req.params.id; 

  try {
    const project = await Project.findById(pid)
      .populate("sharedWith.userId", "username email"); 
    
    if (!project)
      return res.status(404).json({ message: "Project not found" });

    if (project.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Only the owner can view the shared list" });
    }

    res.status(200).json({
      sharedWith: project.sharedWith.map((entry) => {
        const user = entry.userId || {}; 
        return {
          username: user.username || null,
          email: user.email || null,
          permission: entry.permission
        };
      }),
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

