import React from "react";
import { motion } from "framer-motion";

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
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="md:w-64 bg-blue-50 border-r p-6 hidden md:block sticky top-0 h-screen shadow-sm"
      >
        <h2 className="text-xl font-bold text-blue-700 mb-6">📘 Docs</h2>
        <ul className="space-y-3 text-gray-700">
          {sections.map((section, index) => (
            <motion.li
              key={index}
              whileHover={{ x: 5 }}
              className="hover:text-blue-600 text-sm transition cursor-pointer"
            >
              {section.title}
            </motion.li>
          ))}
        </ul>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 px-6 py-8 md:px-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-blue-700 mb-10"
        >
          API Snap Documentation
        </motion.h1>

        {sections.map((section, index) => (
          <motion.section
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="mb-12 bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              {section.title}
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              {section.content}
            </p>
          </motion.section>
        ))}
      </main>
    </div>
  );
};

export default Docs;
