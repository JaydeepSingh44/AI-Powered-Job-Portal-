const express = require("express");
const router = express.Router();

const {
  applyJob,
  getMyApplications,
  getApplicantsForJob,
  updateApplicationStatus,
} = require("../controllers/application");

const { auth, isjobSeeker, isCompany } = require("../middlewares/auth");

/* ================= JOB SEEKER ROUTES ================= */

// Apply for a job
router.post("/apply/:jobId", auth, isjobSeeker, applyJob);


// Get logged-in job seeker's applications
router.get("/my-applications", auth, isjobSeeker, getMyApplications);


/* ================= COMPANY ROUTES ================= */

// Get applicants for a job
router.get(
  "/job/:jobId/applicants",
  auth,
  isCompany,
  getApplicantsForJob
);

// Update application status
router.put(
  "/:applicationId/status",
  auth,
  isCompany,
  updateApplicationStatus
);

module.exports = router;
