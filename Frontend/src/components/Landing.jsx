import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom, duration: 0.6, ease: "easeOut" },
  }),
};


const Landing = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <Navbar />

      {/* HERO SECTION */}
      <section className="text-center py-20 px-6 bg-gradient-to-br from-blue-50 to-white">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0} // delay for this element
          className="text-4xl sm:text-5xl font-extrabold mb-4 text-blue-700"
        >
          Simplify Your API Workflow
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0.2}
          className="text-lg text-gray-600 mb-8 max-w-xl mx-auto"
        >
          Test, mock, and manage APIs in one collaborative workspace.
        </motion.p>


        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0.35}
          className="space-x-4"
        >
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
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 px-6 bg-white">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.1}
          className="text-3xl font-semibold text-center mb-12"
        >
          Everything you need for API development
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            ["Live API Testing", "Test your API endpoints instantly with a built-in client."],
            ["Mock Responses", "Simulate API responses when your backend isn't ready."],
            ["Response History", "Track and compare changes in API responses over time."],
            ["Project-based Organization", "Group APIs by project to keep everything tidy."],
            ["Team Collaboration", "Invite your team and collaborate on API structures."],
            ["Secure & Reliable", "Built with modern standards and secure authentication."]
          ].map(([title, desc], idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={idx*0.1}
              className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition"
            >
              <h3 className="text-lg font-bold text-blue-700 mb-2">{title}</h3>
              <p className="text-sm text-gray-600">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-6 bg-gray-50 text-center">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.1}
          className="text-3xl font-semibold mb-12"
        >
          How It Works
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.2}
          className="flex flex-wrap justify-center items-center gap-6 text-lg font-medium text-gray-700"
        >
          {["1. Create Project", "→", "2. Add Endpoints", "→", "3. Test Live", "→", "4. Share with Team"].map(
            (text, i) => (
              <span key={i}>{text}</span>
            )
          )}
        </motion.div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-6 bg-white text-center">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.1}
          className="text-3xl font-semibold mb-12"
        >
          What Developers Say
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {[
            ["API Snap has streamlined our workflow drastically!", "— John D."],
            ["A must-have tool for modern backend teams.", "— Sarah K."],
          ].map(([quote, author], idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={idx*0.2}
            >
              <p className="text-lg italic text-gray-700">“{quote}”</p>
              <p className="mt-2 text-sm text-gray-500">{author}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-6 bg-blue-600 text-white text-center">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.1}
          className="text-3xl font-bold mb-4"
        >
          Start using API Snap today
        </motion.h2>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.2}
          className="mb-6 text-lg opacity-90"
        >
          Join developers who are streamlining their API workflows
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.3}
        >
          <NavLink
            to="/signup"
            className="bg-white text-blue-600 px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition"
          >
            Get Started for Free
          </NavLink>
        </motion.div>
      </section>

      {/* FOOTER */}
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
