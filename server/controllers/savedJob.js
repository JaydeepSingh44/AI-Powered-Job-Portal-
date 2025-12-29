const SavedJob = require("../models/savedJob");
const Job = require("../models/job");

/* ================= SAVE JOB ================= */
exports.saveJob = async (req, res) => {
  try {
    const jobSeekerId = req.user.id;
    const { jobId } = req.params;

    // Check job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const savedJob = await SavedJob.create({
      jobSeekerId,
      jobId,
    });

    res.status(201).json({
      success: true,
      message: "Job saved successfully",
      savedJob,
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Job already saved",
      });
    }

    console.log("SAVE JOB ERROR →", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= REMOVE SAVED JOB ================= */
exports.removeSavedJob = async (req, res) => {
  try {
    const jobSeekerId = req.user.id;
    const { jobId } = req.params;

    await SavedJob.findOneAndDelete({
      jobSeekerId,
      jobId,
    });

    res.status(200).json({
      success: true,
      message: "Job removed from saved list",
    });

  } catch (error) {
    console.log("REMOVE SAVED JOB ERROR →", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= GET SAVED JOBS ================= */
exports.getSavedJobs = async (req, res) => {
  try {
    const jobSeekerId = req.user.id;

    const savedJobs = await SavedJob.find({ jobSeekerId })
      .populate("jobId");

    res.status(200).json({
      success: true,
      count: savedJobs.length,
      savedJobs,
    });

  } catch (error) {
    console.log("GET SAVED JOBS ERROR →", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
