const mongoose = require("mongoose");

const savedJobSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

/* Prevent same job from being saved twice by same user */
savedJobSchema.index(
  { jobSeekerId: 1, jobId: 1 },
  { unique: true }
);

module.exports = mongoose.model("savedJob", savedJobSchema);
