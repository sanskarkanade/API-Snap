import React from "react";

const AccountSettings = () => {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Account Settings</h2>

      <form className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input type="text" className="w-full border rounded p-2" placeholder="Your name" />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input type="email" className="w-full border rounded p-2" placeholder="you@example.com" />
        </div>

        <div>
          <label className="block font-medium mb-1">Password</label>
          <input type="password" className="w-full border rounded p-2" placeholder="********" />
        </div>

        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default AccountSettings;
