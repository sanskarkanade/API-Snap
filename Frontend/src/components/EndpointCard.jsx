import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const methodColors = {
  GET: "bg-green-100 text-green-700",
  POST: "bg-blue-100 text-blue-700",
  PUT: "bg-yellow-100 text-yellow-700",
  DELETE: "bg-red-100 text-red-700",
  PATCH: "bg-purple-100 text-purple-700",
};

const EndpointCard = ({ ep, index, onDelete, projectId, onUpdated }) => {
  const [showTest, setShowTest] = useState(false);
  const [reqBody, setReqBody] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [editing, setEditing] = useState(false);
  const [editedMethod, setEditedMethod] = useState(ep.method);
  const [editedPath, setEditedPath] = useState(ep.path);
  const [editedDescription, setEditedDescription] = useState(ep.description);

  const handleTest = async () => {
    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const res = await fetch(ep.path, {
        method: ep.method,
        headers: { "Content-Type": "application/json" },
        body: ep.method === "GET" ? null : reqBody,
      });

      const data = await res.json();
      setResponse({ status: res.status, data });

      const token = localStorage.getItem("token");
      await fetch(
        `https://api-snap.onrender.com/api/projects/${projectId}/endpoints/${index}/history`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: res.status,
            responseBody: data,
          }),
        }
      );

      if (onUpdated) onUpdated();
    } catch (err) {
      setError("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `https://api-snap.onrender.com/api/projects/${projectId}/endpoints/${index}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            method: editedMethod,
            path: editedPath,
            description: editedDescription,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      setEditing(false);
      if (onUpdated) onUpdated();
    } catch (err) {
      alert("Failed to update endpoint: " + err.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-gray-200 shadow-md bg-white p-6 rounded-xl mb-6"
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        {/* Left side */}
        {editing ? (
          <div className="flex flex-wrap gap-2 w-full">
            {/* Method */}
            <select
              value={editedMethod}
              onChange={(e) => setEditedMethod(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            >
              {["GET", "POST", "PUT", "DELETE", "PATCH"].map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>

            {/* Path */}
            <input
              value={editedPath}
              onChange={(e) => setEditedPath(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-lg text-sm w-48 focus:ring-2 focus:ring-blue-500"
              placeholder="/api/endpoint"
            />

            {/* Description */}
            <input
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-lg text-sm w-60 focus:ring-2 focus:ring-blue-500"
              placeholder="Short description"
            />
          </div>
        ) : (
          <div>
            <span
              className={`px-3 py-1 rounded-md font-semibold text-xs mr-2 ${methodColors[ep.method]}`}
            >
              {ep.method}
            </span>

            <span className="font-medium text-gray-800">{ep.path}</span>

            <div className="text-gray-500 text-sm mt-1">{ep.description}</div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 text-sm">
          {editing ? (
            <>
              <button
                onClick={handleSave}
                className="text-green-600 hover:underline font-medium"
              >
                Save
              </button>

              <button
                className="text-gray-500 hover:underline font-medium"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="text-blue-600 hover:underline font-medium"
                onClick={() => setShowTest(!showTest)}
              >
                {showTest ? "Hide" : "Test"}
              </button>

              <button
                className="text-yellow-600 hover:underline font-medium"
                onClick={() => setEditing(true)}
              >
                Edit
              </button>

              <button
                onClick={onDelete}
                className="text-red-600 hover:underline font-medium"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      {/* Test Section */}
      <AnimatePresence>
        {showTest && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 overflow-hidden"
          >
            {ep.method !== "GET" && (
              <textarea
                className="w-full border border-gray-300 p-3 rounded-lg text-sm mb-3 focus:ring-2 focus:ring-blue-500"
                placeholder='{"key":"value"}'
                rows={3}
                value={reqBody}
                onChange={(e) => setReqBody(e.target.value)}
              />
            )}

            <button
              onClick={handleTest}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-md shadow-sm"
            >
              {loading ? "Testing..." : "Send Request"}
            </button>

            {response && (
              <pre className="mt-4 bg-gray-100 p-4 rounded-lg text-sm whitespace-pre-wrap">
                ✅ Status: {response.status}
                {"\n"}
                {JSON.stringify(response.data, null, 2)}
              </pre>
            )}

            {error && (
              <p className="mt-2 text-red-600 text-sm">{error}</p>
            )}

            {/* Test History */}
            {ep.history?.length > 0 && (
              <div className="mt-5 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-sm text-gray-700 mb-2">
                  Test History
                </h4>

                <ul className="text-xs text-gray-700 space-y-2 max-h-40 overflow-y-auto">
                  {ep.history
                    .slice()
                    .reverse()
                    .map((h, i) => (
                      <li key={i} className="border-b pb-2">
                        <span className="font-medium">Status:</span>{" "}
                        {h.status} •{" "}
                        <span className="font-medium">Time:</span>{" "}
                        {new Date(h.timestamp).toLocaleString()}
                        <div className="bg-gray-100 p-2 rounded mt-1 text-gray-800">
                          <code>{JSON.stringify(h.responseBody)}</code>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EndpointCard;
