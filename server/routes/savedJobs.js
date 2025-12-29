const express = require("express");
const router = express.Router();

const {
  saveJob,
  removeSavedJob,
  getSavedJobs,
} = require("../controllers/savedJob");

const { auth, isjobSeeker } = require("../middlewares/auth");

router.use(auth, isjobSeeker);

router.post("/save/:jobId", saveJob);
router.delete("/remove/:jobId", removeSavedJob);
router.get("/", getSavedJobs);

module.exports = router;
