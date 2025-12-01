import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareEmail, setShareEmail] = useState("");
  const [sharePermission, setSharePermission] = useState("view");
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [sharedUsers, setSharedUsers] = useState([]);

  // ---------------- SHARE MODAL ----------------
  const openShareModal = async (projectId) => {
    setCurrentProjectId(projectId);
    setShowShareModal(true);

    const token = localStorage.getItem("token");

    const res = await fetch(`https://api-snap.onrender.com/api/projects/${projectId}/share`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setSharedUsers(data.sharedWith || []);
  };

  const handleShare = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const res = await fetch(
      `https://api-snap.onrender.com/api/projects/${currentProjectId}/share`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: shareEmail, permission: sharePermission }),
      }
    );

    const data = await res.json();
    alert(data.message);
    openShareModal(currentProjectId);
    setShareEmail("");
  };

  const removeSharedUser = async (email) => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `https://api-snap.onrender.com/api/projects/${currentProjectId}/share`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await res.json();
    alert(data.message);
    openShareModal(currentProjectId);
  };

  // ---------------- CREATE PROJECT ----------------
  const handleCreateProject = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("https://api-snap.onrender.com/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, description }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setProjects((prev) => [data, ...prev]);
      setName("");
      setDescription("");
      setShowForm(false);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  // ---------------- DELETE PROJECT ----------------
  const handleDelete = async (projectId) => {
    if (!window.confirm("Delete this project?")) return;

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `https://api-snap.onrender.com/api/projects/${projectId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setProjects((prev) => prev.filter((p) => p._id !== projectId));
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  // ---------------- FETCH PROJECTS ----------------
  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch("https://api-snap.onrender.com/api/projects", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!res.ok) throw new Error("Failed to fetch projects");

        setProjects(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-6 py-12">
        {/* ---------------- HEADER ---------------- */}
        <header className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold text-blue-700"
          >
            Welcome back, Developer 👋
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-600 mt-2"
          >
            Manage your projects and APIs with ease.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          
          {/* ---------------- PROJECT LIST ---------------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-lg col-span-2"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Recent Projects
            </h2>

            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : projects.length > 0 ? (
              <ul className="space-y-5">
                <AnimatePresence>
                  {projects.map((project) => (
                    <motion.li
                      key={project._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      whileHover={{ scale: 1.01 }}
                      className="flex justify-between items-start p-4 rounded-xl bg-gray-50 border border-gray-200"
                    >
                      <div>
                        <Link
                          to={`/project/${project._id}`}
                          className="text-lg font-medium text-blue-600 hover:underline"
                        >
                          {project.name}
                        </Link>
                        <p className="text-sm text-gray-500">
                          Updated:{" "}
                          {new Date(project.updatedAt).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex flex-col gap-1">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          onClick={() => openShareModal(project._id)}
                          className="text-sm text-blue-600"
                        >
                          🔗 Share
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          onClick={() => handleDelete(project._id)}
                          className="text-sm text-red-600"
                        >
                          🗑️ Delete
                        </motion.button>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            ) : (
              <p className="text-gray-500">No projects found. Create one!</p>
            )}
          </motion.div>

          {/* ---------------- QUICK ACTIONS ---------------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Quick Actions
            </h2>

            <div className="flex flex-col gap-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                onClick={() => setShowForm(!showForm)}
              >
                ➕ New Project
              </motion.button>

              <AnimatePresence>
                {showForm && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleCreateProject}
                    className="bg-blue-50 border border-blue-100 rounded-lg p-4 overflow-hidden space-y-4"
                  >
                    {error && <p className="text-red-600 text-sm">{error}</p>}

                    <input
                      type="text"
                      placeholder="Project name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      required
                    />

                    <textarea
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    />

                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                    >
                      Create Project
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/settings")}
                className="bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200"
              >
                ⚙️ Account Settings
              </motion.button>
            </div>
          </motion.div>
        </div>

        <footer className="mt-20 text-center text-sm text-gray-400">
          © 2025 API Snap — Built for developers 🚀
        </footer>
      </div>

      {/* ---------------- SHARE MODAL ---------------- */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-4">Share Project</h2>

              <form onSubmit={handleShare} className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter user email"
                  value={shareEmail}
                  onChange={(e) => setShareEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                />

                <select
                  value={sharePermission}
                  onChange={(e) => setSharePermission(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="view">View</option>
                  <option value="edit">Edit</option>
                </select>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
                >
                  Share
                </motion.button>
              </form>

              <h3 className="text-lg font-medium mt-6 mb-2">Shared With</h3>

              <ul className="space-y-2">
                {sharedUsers.length > 0 ? (
                  sharedUsers.map((u, index) => (
                    <li
                      key={index}
                      className="flex justify-between bg-gray-50 p-2 rounded-lg"
                    >
                      <span>
                        {u.email} ({u.permission})
                      </span>
                      <button
                        onClick={() => removeSharedUser(u.email)}
                        className="text-red-600 text-sm"
                      >
                        Remove
                      </button>
                    </li>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No shared users.</p>
                )}
              </ul>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowShareModal(false)}
                className="mt-4 w-full py-2 border rounded hover:bg-gray-100"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Home;
