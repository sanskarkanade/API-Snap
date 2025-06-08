import React from "react";

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
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-blue-700 mb-4">Simple & Transparent Pricing</h2>
        <p className="text-gray-600 text-lg mb-16">Choose a plan that fits your needs. No hidden fees.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">{plan.title}</h3>
              <p className="text-4xl font-bold text-blue-600 mb-2">{plan.price}</p>
              <p className="text-gray-500 mb-6">{plan.description}</p>
              <ul className="text-gray-700 mb-6 space-y-2 text-left">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>✅ {feature}</li>
                ))}
              </ul>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
                {plan.title === "Free" ? "Get Started" : "Subscribe"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
