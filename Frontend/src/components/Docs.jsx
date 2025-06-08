import React from "react";

const Docs = () => {
  const sections = [
    {
      title: "Getting Started",
      content:
        "Learn how to set up your account, create your first project, and test your first API.",
    },
    {
      title: "Authentication",
      content:
        "Understand how to use API keys, bearer tokens, and OAuth2 to secure your endpoints.",
    },
    {
      title: "Mocking APIs",
      content:
        "Set up mock endpoints to simulate API responses during development.",
    },
    {
      title: "API Testing",
      content:
        "Test REST endpoints, send payloads, view status codes, headers, and more.",
    },
    {
      title: "Version Control",
      content:
        "Track and manage changes in your APIs using built-in versioning tools.",
    },
  ];

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-50 p-6 border-r hidden md:block">
        <h2 className="text-xl font-semibold text-blue-700 mb-6">Docs</h2>
        <ul className="space-y-4 text-gray-700">
          {sections.map((section, index) => (
            <li key={index} className="hover:text-blue-600 cursor-pointer">
              {section.title}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-blue-700 mb-8">API Snap Documentation</h1>
        {sections.map((section, index) => (
          <section key={index} className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {section.title}
            </h2>
            <p className="text-gray-600">{section.content}</p>
            <hr className="mt-6 mb-4 border-gray-200" />
          </section>
        ))}
      </main>
    </div>
  );
};

export default Docs;
