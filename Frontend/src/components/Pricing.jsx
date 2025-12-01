import React from "react";
import { motion } from "framer-motion";

const plans = [
  {
    title: "Free",
    price: "$0",
    description: "Great for personal projects or quick testing.",
    features: [
      "1 Project",
      "Mock Server Access",
      "Basic API Testing",
      "Community Support",
    ],
    highlight: false,
  },
  {
    title: "Pro",
    price: "$9/mo",
    description: "Ideal for solo developers and freelancers.",
    features: [
      "10 Projects",
      "Version Control",
      "Response History",
      "Email Support",
    ],
    highlight: true, // Highlight this plan
  },
  {
    title: "Team",
    price: "$29/mo",
    description: "Perfect for teams who need collaboration.",
    features: [
      "Unlimited Projects",
      "Team Access & Sharing",
      "Priority Support",
      "Audit Logs",
    ],
    highlight: false,
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto text-center"
      >
        <h2 className="text-4xl font-bold text-blue-700 mb-4">
          Simple & Transparent Pricing
        </h2>
        <p className="text-gray-600 text-lg mb-16">
          Choose a plan that fits your needs. No hidden fees.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              whileHover={{
                scale: 1.04,
                transition: { duration: 0.2 },
              }}
              className={`relative bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition border ${
                plan.highlight ? "border-blue-500 shadow-xl scale-[1.02]" : "border-gray-100"
              }`}
            >
              {/* Highlight Badge */}
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                {plan.title}
              </h3>
              <p className="text-4xl font-bold text-blue-600 mb-2">
                {plan.price}
              </p>
              <p className="text-gray-500 mb-6">{plan.description}</p>

              <ul className="text-gray-700 mb-6 space-y-2 text-left">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-green-500">✔</span> {feature}
                  </li>
                ))}
              </ul>

              <motion.button
                whileTap={{ scale: 0.97 }}
                className={`w-full py-3 rounded-lg text-white font-medium transition ${
                  plan.highlight
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-800 hover:bg-gray-900"
                }`}
              >
                {plan.title === "Free" ? "Get Started" : "Subscribe"}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Pricing;
