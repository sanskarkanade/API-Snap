import React from "react";
import { motion } from "framer-motion";

const Profile = ({ user }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8"
      >
        {/* Profile Image */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="w-28 h-28 rounded-full overflow-hidden shadow-md border">
            <img
              src={
                user?.avatar ||
                "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mt-4">
            {user?.name || "User Name"}
          </h2>

          <p className="text-gray-500 text-sm">
            {user?.email || "example@gmail.com"}
          </p>
        </motion.div>

        {/* Divider */}
        <div className="h-px w-full bg-gray-200 my-6"></div>

        {/* Profile Details */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div>
            <h3 className="text-sm text-gray-500 font-medium">Joined On</h3>
            <p className="text-gray-800 font-semibold">
              {user?.createdAt
                ? new Date(user.createdAt).toDateString()
                : "N/A"}
            </p>
          </div>

          <div>
            <h3 className="text-sm text-gray-500 font-medium">Account Status</h3>
            <p className="text-gray-800 font-semibold">Active</p>
          </div>

          {user?.about && (
            <div>
              <h3 className="text-sm text-gray-500 font-medium">About</h3>
              <p className="text-gray-700 leading-relaxed">{user.about}</p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Profile;
