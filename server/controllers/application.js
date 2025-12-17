const Application = require("../models/application");
const Job = require("../models/job");

/* JobSeeker applies for job */
exports.applyJob = async (req, res) => {
  try {
    const jobSeekerId = req.user.id;
    const { jobId } = req.params;
    const { resumeUrl } = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const application = await Application.create({
      jobSeekerId,
      jobId,
      companyId: job.companyId,
      resumeUrl,
    });

    res.status(201).json({
      success: true,
      message: "Applied successfully",
      application,
    });
  } catch (error) {
    console.log("APPLY JOB ERROR →", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* JobSeeker: get my applications */
exports.getMyApplications = async (req, res) => {
  try {
    const jobSeekerId = req.user.id;

    const applications = await Application.find({ jobSeekerId })
      .populate("jobId", "title location salary")
      .populate("companyId", "companyName");

    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    console.log("GET MY APPLICATIONS ERROR →", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* Company: get applicants for a job */
exports.getApplicantsForJob = async (req, res) => {
  try {
    const companyId = req.user.id;
    const { jobId } = req.params;
    

    const applications = await Application.find({ jobId, companyId })
      .populate("jobSeekerId", "name email skills")
      .populate("jobId", "title");

    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    console.log("GET APPLICANTS ERROR →", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* Company updates application status */
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status, notes } = req.body;

    const application = await Application.findByIdAndUpdate(
      applicationId,
      { status, notes },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Application updated",
      application,
    });
  } catch (error) {
    console.log("UPDATE APPLICATION ERROR →", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
