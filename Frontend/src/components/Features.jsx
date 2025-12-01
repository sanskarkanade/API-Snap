import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Live API Testing",
    description:
      "Instantly send requests to your endpoints with a built-in client and view full response details.",
  },
  {
    title: "Mock Responses",
    description:
      "Simulate responses for endpoints that are not yet implemented or are under development.",
  },
  {
    title: "Change Tracking",
    description:
      "Track changes in API response structure over time and get diffs for each version.",
  },
  {
    title: "Organized Projects",
    description:
      "Group your APIs by project, version, or use-case to keep everything structured.",
  },
  {
    title: "Team Collaboration",
    description:
      "Invite team members to projects, assign roles, and collaborate in real-time.",
  },
  {
    title: "Security & Reliability",
    description:
      "End-to-end encrypted communication and secure token management to protect your APIs.",
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.12,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const Features = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-blue-700 mb-4"
        >
          Powerful Features
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-600 mb-12"
        >
          Everything you need to manage, test, and document your APIs in one place.
        </motion.p>

        {/* Feature Grid */}
        <div className="grid gap-10 md:grid-cols-3 sm:grid-cols-2">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariant}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all cursor-default"
            >
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
