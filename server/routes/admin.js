const express = require("express");
const router = express.Router();

const {
  getAdminProfile,
  getAllCompanies,
  getAllJobs,
  getAllJobSeekers,
  deleteJobByAdmin,
} = require("../controllers/admin");

const { auth, isAdmin } = require("../middlewares/auth");

/* Protect all admin routes */
router.use(auth, isAdmin);

router.get("/profile", getAdminProfile);
router.get("/companies", getAllCompanies);
router.get("/jobs", getAllJobs);
router.get("/jobseekers", getAllJobSeekers);
router.delete("/job/:jobId", deleteJobByAdmin);

module.exports = router;
