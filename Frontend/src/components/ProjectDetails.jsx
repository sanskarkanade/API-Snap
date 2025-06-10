import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Form states
  const [method, setMethod] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  const handleDeleteEndpoint = async (index) => {
    const token = localStorage.getItem("token");

    if (!window.confirm("Are you sure you want to delete this endpoint?")) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/projects/${id}/endpoints/${index}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");

      // Refresh updated project
      await fetchProject();
    } catch (err) {
      alert("Error deleting endpoint: " + err.message);
    }
  };


  const fetchProject = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Not authenticated");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Project not found");

      const data = await res.json();
      setProject(data);
    } catch (err) {
      setError(err.message || "Failed to load project");
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
      const res = await fetch(`http://localhost:5000/api/projects/${id}/endpoints`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ method, path, description }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to add endpoint");

      // Refresh project with new endpoint
      await fetchProject();

      // Clear form
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
    <div className="p-6 max-w-6xl mx-auto">
      <Link to={`/project/${project._id}`} className="font-medium text-blue-600 hover:underline">
        {project.name}
      </Link>

      <p className="text-gray-700 mb-6">{project.description}</p>

      <form onSubmit={handleAddEndpoint} className="space-y-4 mb-6">
        <h3 className="text-xl font-semibold">Add API Endpoint</h3>

        <div className="flex gap-4">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="p-2 border rounded"
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
            className="flex-grow p-2 border rounded"
            required
          />
        </div>

        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {saving ? "Saving..." : "Add Endpoint"}
        </button>
      </form>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="border rounded p-4">
          <h3 className="text-xl font-semibold mb-2">Endpoints</h3>
          {project.endpoints?.length ? (
            <ul className="text-sm text-gray-700 space-y-2">
              {project.endpoints.map((ep, idx) => (
                <li key={idx} className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">{ep.method}</span> {ep.path} — {ep.description}
                  </div>
                  <button
                    onClick={() => handleDeleteEndpoint(idx)}
                    className="text-red-600 text-xs hover:underline"
                  >
                    🗑️ Delete
                  </button>
                </li>
              ))}
            </ul>

          ) : (
            <p className="text-sm text-gray-500">No endpoints added yet.</p>
          )}
        </div>

        <div className="border rounded p-4">
          <h3 className="text-xl font-semibold mb-2">Mock Data</h3>
          <p className="text-sm text-gray-600">You can simulate responses here.</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
