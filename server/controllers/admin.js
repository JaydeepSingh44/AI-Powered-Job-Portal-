const Admin = require("../models/admin");
const Company = require("../models/company");
const Job = require("../models/job");
const JobSeeker = require("../models/jobSeeker");

/* ================= ADMIN PROFILE ================= */
exports.getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select("-password");

    res.status(200).json({
      success: true,
      admin,
    });
  } catch (error) {
    console.log("ADMIN PROFILE ERROR →", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ================= GET ALL COMPANIES ================= */
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find().select("-password");

    res.status(200).json({
      success: true,
      count: companies.length,
      companies,
    });
  } catch (error) {
    console.log("GET COMPANIES ERROR →", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ================= GET ALL JOBS ================= */
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("companyId", "companyName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.log("GET JOBS ERROR →", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ================= GET ALL JOB SEEKERS ================= */
exports.getAllJobSeekers = async (req, res) => {
  try {
    const jobSeekers = await JobSeeker.find().select("-password");

    res.status(200).json({
      success: true,
      count: jobSeekers.length,
      jobSeekers,
    });
  } catch (error) {
    console.log("GET JOB SEEKERS ERROR →", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ================= DELETE JOB (ADMIN POWER) ================= */
exports.deleteJobByAdmin = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findByIdAndDelete(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job deleted by admin",
    });
  } catch (error) {
    console.log("ADMIN DELETE JOB ERROR →", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
