import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";

const Landing = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <Navbar />

      {/* Hero */}
      <section className="text-center py-20 px-6 bg-gradient-to-br from-blue-50 to-white">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-blue-700">
          Simplify Your API Workflow
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
          Test, mock, and manage APIs in one collaborative workspace.
        </p>
        <div className="space-x-4">
          <NavLink
            to="/signup"
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition"
          >
            Get Started for Free
          </NavLink>
          <a
            href="#features"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition"
          >
            See Live Demo
          </a>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-white">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Everything you need for API development
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            ["Live API Testing", "Test your API endpoints instantly with a built-in client."],
            ["Mock Responses", "Simulate API responses when your backend isn't ready."],
            ["Response History", "Track and compare changes in API responses over time."],
            ["Project-based Organization", "Group APIs by project to keep everything tidy."],
            ["Team Collaboration", "Invite your team and collaborate on API structures."],
            ["Secure & Reliable", "Built with modern standards and secure authentication."]
          ].map(([title, desc], idx) => (
            <div
              key={idx}
              className="p-6 bg-blue-50 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-lg font-bold text-blue-700 mb-2">{title}</h3>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-gray-50 text-center">
        <h2 className="text-3xl font-semibold mb-12">How It Works</h2>
        <div className="flex flex-wrap justify-center items-center gap-6 text-lg font-medium text-gray-700">
          <span>1. Create Project</span>
          <span>→</span>
          <span>2. Add Endpoints</span>
          <span>→</span>
          <span>3. Test Live</span>
          <span>→</span>
          <span>4. Share with Team</span>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-white text-center">
        <h2 className="text-3xl font-semibold mb-12">What Developers Say</h2>
        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {[
            ["API Snap has streamlined our workflow drastically!", "— John D."],
            ["A must-have tool for modern backend teams.", "— Sarah K."]
          ].map(([quote, author], idx) => (
            <div key={idx}>
              <p className="text-lg italic text-gray-700">“{quote}”</p>
              <p className="mt-2 text-sm text-gray-500">{author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Start using API Snap today</h2>
        <p className="mb-6 text-lg">
          Join developers who are streamlining their API workflows
        </p>
        <NavLink
          to="/signup"
          className="bg-white text-blue-600 px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition"
        >
          Get Started for Free
        </NavLink>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-12 px-6 text-sm text-gray-500 text-center">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-8 text-left">
          <div>
            <p className="font-semibold text-gray-700 mb-2">Product</p>
            <a href="#features" className="block hover:underline">Features</a>
            <a href="#pricing" className="block hover:underline">Pricing</a>
            <a href="#docs" className="block hover:underline">Docs</a>
          </div>
          <div>
            <p className="font-semibold text-gray-700 mb-2">Company</p>
            <a href="#" className="block hover:underline">About</a>
            <a href="#" className="block hover:underline">Blog</a>
            <a href="#" className="block hover:underline">Careers</a>
          </div>
          <div>
            <p className="font-semibold text-gray-700 mb-2">Legal</p>
            <a href="#" className="block hover:underline">Privacy</a>
            <a href="#" className="block hover:underline">Terms</a>
          </div>
        </div>
        <p>© 2025 API Snap. Built with ❤️ by developers.</p>
      </footer>
    </div>
  );
};

export default Landing;
