const express = require("express");
const router = express.Router();

const {
  getAllJobs,
  getJobById,
  searchJob,
  filterJob,
} = require("../controllers/job");

/* SPECIFIC ROUTES FIRST */
router.get("/search/jobs", searchJob);
router.get("/filter/jobs", filterJob);

/* GENERAL ROUTES */
router.get("/", getAllJobs);
router.get("/:jobId", getJobById);

module.exports = router;
