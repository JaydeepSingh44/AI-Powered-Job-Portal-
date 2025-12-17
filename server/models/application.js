const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    jobSeekerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jobSeeker",
      required: true,
    },

    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "job",
      required: true,
    },

    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
      required: true,
    },

    resumeUrl: {
      type: String,
    },

    status: {
      type: String,
      enum: ["Applied", "Viewed", "Shortlisted", "Rejected", "Hired"],
      default: "Applied",
    },

    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

/* Prevent duplicate application */
applicationSchema.index(
  { jobSeekerId: 1, jobId: 1 },
  { unique: true }
);

module.exports = mongoose.model("application", applicationSchema);
