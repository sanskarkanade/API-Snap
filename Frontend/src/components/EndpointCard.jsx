import React, { useState } from "react";

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

      // Save test history
      const token = localStorage.getItem("token");
      await fetch(
        `http://localhost:5000/api/projects/${projectId}/endpoints/${index}/history`,
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
        `http://localhost:5000/api/projects/${projectId}/endpoints/${index}`,
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
    <div className="border border-gray-200 shadow-md bg-white p-5 rounded-xl mb-6">
      {/* Header row */}
      <div className="flex justify-between items-start gap-2 mb-2">
        {editing ? (
          <div className="flex flex-wrap gap-2">
            <select
              value={editedMethod}
              onChange={(e) => setEditedMethod(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
              <option value="PATCH">PATCH</option>
            </select>

            <input
              value={editedPath}
              onChange={(e) => setEditedPath(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-lg text-sm w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="/api/endpoint"
            />
            <input
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-lg text-sm w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Short description"
            />
          </div>
        ) : (
          <p className="text-sm text-gray-700">
            <span className="font-semibold">{ep.method}</span> {ep.path} —{" "}
            <span className="text-gray-600">{ep.description}</span>
          </p>
        )}

        {/* Buttons */}
        <div className="flex gap-3 text-sm">
          {editing ? (
            <>
              <button
                className="text-green-600 hover:underline font-medium"
                onClick={handleSave}
              >
                💾 Save
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
                {showTest ? "Hide Test" : "Test"}
              </button>
              <button
                className="text-yellow-600 hover:underline font-medium"
                onClick={() => setEditing(true)}
              >
                ✏️ Edit
              </button>
              <button
                onClick={onDelete}
                className="text-red-600 hover:underline font-medium"
              >
                🗑️ Delete
              </button>
            </>
          )}
        </div>
      </div>

      {/* Test Section */}
      {showTest && (
        <div className="mt-4">
          {ep.method !== "GET" && (
            <textarea
              className="w-full border border-gray-300 p-3 rounded-lg text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder='{"key": "value"}'
              rows={3}
              value={reqBody}
              onChange={(e) => setReqBody(e.target.value)}
            />
          )}
          <button
            onClick={handleTest}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-md shadow-sm transition"
          >
            {loading ? "Testing..." : "Send Request"}
          </button>

          {response && (
            <pre className="mt-4 bg-gray-100 p-3 rounded-lg text-sm overflow-auto whitespace-pre-wrap">
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
            <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-sm mb-2 text-gray-700">
                🕒 Test History
              </h4>
              <ul className="text-xs text-gray-700 space-y-2 max-h-40 overflow-y-auto">
                {ep.history
                  .slice()
                  .reverse()
                  .map((h, i) => (
                    <li key={i} className="border-b pb-2">
                      <div>
                        <span className="font-medium">Status:</span> {h.status} &nbsp;
                        <span className="font-medium">Time:</span>{" "}
                        {new Date(h.timestamp).toLocaleString()}
                      </div>
                      <div className="bg-gray-100 mt-1 p-2 rounded text-gray-800">
                        <code>{JSON.stringify(h.responseBody)}</code>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EndpointCard;
