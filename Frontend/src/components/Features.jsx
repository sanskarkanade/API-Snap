import React from "react";

const features = [
  {
    title: "Live API Testing",
    description: "Instantly send requests to your endpoints with a built-in client and view full response details.",
  },
  {
    title: "Mock Responses",
    description: "Simulate responses for endpoints that are not yet implemented or are under development.",
  },
  {
    title: "Change Tracking",
    description: "Track changes in API response structure over time and get diffs for each version.",
  },
  {
    title: "Organized Projects",
    description: "Group your APIs by project, version, or use-case to keep everything structured.",
  },
  {
    title: "Team Collaboration",
    description: "Invite team members to projects, assign roles, and collaborate in real-time.",
  },
  {
    title: "Security & Reliability",
    description: "End-to-end encrypted communication and secure token management to protect your APIs.",
  },
];

const Features = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-blue-700 mb-4">Powerful Features</h2>
        <p className="text-lg text-gray-600 mb-12">
          Everything you need to manage, test, and document your APIs in one place.
        </p>

        <div className="grid gap-10 md:grid-cols-3 sm:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-left"
            >
              <h3 className="text-xl font-semibold text-blue-600 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
