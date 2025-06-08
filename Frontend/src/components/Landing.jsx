import React from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from './Navbar'

const Landing = () => {
  return (
    <div>
      <Navbar/>
      <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="text-center py-20 px-6 bg-gradient-to-br from-blue-50 to-white">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Simplify Your API Workflow</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
          Test, mock, and manage APIs in one collaborative workspace.
        </p>
        <div className="space-x-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md">Get Started for Free</button>
          <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md">See Live Demo</button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 bg-white">
        <h3 className="text-3xl font-semibold text-center mb-12">Everything you need for API development</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            ["Live API Testing", "Test your API endpoints instantly with a built-in client."],
            ["Mock Responses", "Simulate API responses when your backend isn't ready."],
            ["Response History", "Track and compare changes in API responses over time."],
            ["Project-based Organization", "Group APIs by project to keep everything tidy."],
            ["Team Collaboration", "Invite your team and collaborate on API structures."],
            ["Secure & Reliable", "Built with modern standards and secure authentication."]
          ].map(([title, desc], idx) => (
            <div key={idx} className="p-6 bg-blue-50 rounded-xl shadow hover:shadow-md transition">
              <h4 className="text-xl font-bold mb-2 text-blue-700">{title}</h4>
              <p className="text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 bg-gray-50 text-center">
        <h3 className="text-3xl font-semibold mb-12">How It Works</h3>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-lg">
          <div>1. Create project</div>
          <div>→</div>
          <div>2. Add endpoints</div>
          <div>→</div>
          <div>3. Test live</div>
          <div>→</div>
          <div>4. Share with team</div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-white text-center">
        <h3 className="text-3xl font-semibold mb-12">What Developers Say</h3>
        <div className="flex flex-col md:flex-row justify-center gap-8">
          <div>
            <p className="text-lg italic">"API Snap has streamlined our workflow drastically!"</p>
            <p className="mt-2 text-sm text-gray-500">— John D.</p>
          </div>
          <div>
            <p className="text-lg italic">"A must-have tool for modern backend teams."</p>
            <p className="mt-2 text-sm text-gray-500">— Sarah K.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-blue-600 text-white text-center">
        <h3 className="text-3xl font-bold mb-4">Start using API Snap today</h3>
        <p className="mb-6 text-lg">Join developers who are streamlining their API workflows</p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-md font-medium">Get Started for Free</button>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-8 px-6 text-sm text-gray-500 text-center">
        <div className="flex flex-col md:flex-row justify-center gap-6 mb-4">
          <div>
            <p className="font-semibold text-gray-700 mb-2">Product</p>
            <a href="#features" className="block">Features</a>
            <a href="#pricing" className="block">Pricing</a>
            <a href="#docs" className="block">Docs</a>
          </div>
          <div>
            <p className="font-semibold text-gray-700 mb-2">Company</p>
            <a href="#" className="block">About</a>
            <a href="#" className="block">Blog</a>
            <a href="#" className="block">Careers</a>
          </div>
          <div>
            <p className="font-semibold text-gray-700 mb-2">Legal</p>
            <a href="#" className="block">Privacy</a>
            <a href="#" className="block">Terms</a>
          </div>
        </div>
        <p>© 2025 API Snap. Built with ❤️ by developers.</p>
      </footer>
    </div>
    </div>
  )
}

export default Landing
