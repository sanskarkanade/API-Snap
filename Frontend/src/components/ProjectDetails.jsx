import React from "react";
import { useParams } from "react-router-dom";

const ProjectDetails = () => {
  const { id } = useParams();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Project: {id}</h2>

      {/* Tabs or Sections */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="border rounded p-4">
          <h3 className="text-xl font-semibold mb-2">Endpoints</h3>
          <ul className="text-sm text-gray-600">
            <li>GET /api/user</li>
            <li>POST /api/login</li>
          </ul>
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
