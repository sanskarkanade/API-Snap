import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate, Link } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleCreateProject = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, description }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create project");

      // Update project list
      setProjects((prev) => [data, ...prev]);
      setName("");
      setDescription("");
      setShowForm(false);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (projectId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:5000/api/projects/${projectId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete project");
      }

      // Filter out deleted project
      setProjects((prev) => prev.filter((p) => p._id !== projectId));
    } catch (err) {
      alert("Error: " + err.message);
    }
  };


  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:5000/api/projects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-blue-700">Welcome back, Developer 👋</h1>
          <p className="text-gray-600">Manage your projects and APIs all in one place.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Projects</h2>

            {loading ? (
              <p className="text-gray-500">Loading projects...</p>
            ) : projects.length > 0 ? (
              <ul className="space-y-4">
                {projects.map((project) => (
                  <li
                    key={project._id}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div>
                      <Link
                        to={`/project/${project._id}`}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        {project.name}
                      </Link>
                      <p className="text-sm text-gray-500">
                        Last updated:{" "}
                        {new Date(project.updatedAt).toLocaleDateString()}
                      </p>
                    </div>

                    <button
                      onClick={() => handleDelete(project._id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      🗑️ Delete
                    </button>
                  </li>
                ))}
              </ul>

            ) : (
              <p className="text-gray-500">No projects found.</p>
            )}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                ➕ New Project
              </button>
              {showForm && (
                <form onSubmit={handleCreateProject} className="mt-6 space-y-4">
                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <input
                    type="text"
                    placeholder="Project name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  />

                  <textarea
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border rounded"
                  />

                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                  >
                    Create
                  </button>
                </form>
              )}


              <button
                onClick={() => navigate("/settings")}
                className="bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200"
              >
                ⚙️ Settings
              </button>

            </div>
          </div>
        </div>

        <footer className="mt-16 text-center text-sm text-gray-400">
          © 2025 API Snap. All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default Home;
