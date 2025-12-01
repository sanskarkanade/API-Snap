import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import EndpointCard from "./EndpointCard";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom, duration: 0.6, ease: "easeOut" },
  }),
};

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [method, setMethod] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  const handleDeleteEndpoint = async (index) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Are you sure you want to delete this endpoint?")) return;

    try {
      const res = await fetch(
        `https://api-snap.onrender.com/api/projects/${id}/endpoints/${index}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");

      await fetchProject();
    } catch (err) {
      alert("Error deleting endpoint: " + err.message);
    }
  };

  const fetchProject = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`https://api-snap.onrender.com/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Project not found");

      const data = await res.json();
      setProject(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  const handleAddEndpoint = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `https://api-snap.onrender.com/api/projects/${id}/endpoints`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ method, path, description }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add endpoint");

      await fetchProject();

      setMethod("");
      setPath("");
      setDescription("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6 text-gray-600">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="min-h-screen bg-gray-50 py-10 px-6"
    >
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow">
        
        {/* HEADER */}
        <motion.header variants={fadeUp} custom={0}>
          <Link
            to={`/project/${project._id}`}
            className="text-2xl font-bold text-blue-700 hover:underline"
          >
            {project.name}
          </Link>
          <p className="text-gray-600 mt-1">{project.description}</p>
        </motion.header>

        {/* ADD ENDPOINT FORM */}
        <motion.form
          onSubmit={handleAddEndpoint}
          variants={fadeUp}
          custom={0.2}
          className="bg-blue-50 border border-blue-100 p-6 rounded-xl mb-10 space-y-4"
        >
          <h3 className="text-xl font-semibold text-blue-700">➕ Add API Endpoint</h3>

          <div className="flex flex-col md:flex-row gap-4">
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Method</option>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
              <option value="PATCH">PATCH</option>
            </select>

            <input
              type="text"
              placeholder="/api/route"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              className="flex-grow px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <input
            type="text"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition font-medium"
          >
            {saving ? "Saving..." : "Add Endpoint"}
          </button>
        </motion.form>

        {/* ENDPOINT LIST */}
        <motion.div variants={fadeUp} custom={0.4}>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">📂 Endpoints</h3>

            {project.endpoints?.length > 0 ? (
              <div className="space-y-6">
                {project.endpoints.map((ep, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeUp}
                    custom={0.1 * idx}
                  >
                    <EndpointCard
                      ep={ep}
                      index={idx}
                      projectId={project._id}
                      onDelete={() => handleDeleteEndpoint(idx)}
                      onUpdated={fetchProject}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No endpoints added yet.</p>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectDetails;
