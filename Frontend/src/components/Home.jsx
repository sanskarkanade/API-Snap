import React from "react";
import Navbar from "./Navbar";

const recentProjects = [
  {
    name: "Payment API",
    updated: "2 hours ago",
  },
  {
    name: "User Auth System",
    updated: "Yesterday",
  },
  {
    name: "Inventory Microservice",
    updated: "3 days ago",
  },
];

const Home = () => {
  <Navbar/>
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-blue-700">Welcome back, Developer 👋</h1>
        <p className="text-gray-600">Manage your projects and APIs all in one place.</p>
      </header>

      {/* Dashboard Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md col-span-2">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Projects</h2>
          <ul className="space-y-4">
            {recentProjects.map((project, index) => (
              <li key={index} className="flex justify-between items-center border-b pb-2">
                <span className="font-medium text-blue-600">{project.name}</span>
                <span className="text-sm text-gray-500">Last updated: {project.updated}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="flex flex-col space-y-4">
            <button className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">➕ New Project</button>
            <button className="bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200">📂 View All Projects</button>
            <button className="bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200">⚙️ Settings</button>
          </div>
        </div>
      </div>

      <footer className="mt-16 text-center text-sm text-gray-400">
        © 2025 API Snap. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
