const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    endpoints: [
      {
        method: {
          type: String,
          enum: ["GET", "POST", "PUT", "DELETE", "PATCH"],
          required: true,
        },
        path: { type: String, required: true },
        description: String,
        mockResponse: Object,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
