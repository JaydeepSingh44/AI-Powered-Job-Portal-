const express = require("express");
const router = express.Router();

const{
    getCompanyProfile,
    updateCompanyInfo,
    updateDescription,
    createJob,
    updateJob,
    deleteJob,
    getCompanyJob,
    
} = require("../controllers/company");

const {auth , isCompany } = require("../middlewares/auth");

router.use(auth,isCompany);

router.get("/profile",getCompanyProfile);
router.put("/update-info",updateCompanyInfo);
router.put("/update-description",updateDescription);


router.post("/create-job",createJob);
router.put("/update-job/:jobId",updateJob);
router.delete("/delete-job/:jobId",deleteJob);
router.get("/jobs",getCompanyJob);

module.exports = router;
