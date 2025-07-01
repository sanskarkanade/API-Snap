const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    endpoints: [
      {
        method: String,
        path: String,
        description: String,
        mockResponse: Object,

        history: [
          {
            status: Number,
            timestamp: { type: Date, default: Date.now },
            responseBody: mongoose.Schema.Types.Mixed
          }
        ]
      }
    ],

  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
