const express = require("express");
const router = express.Router();

const {
    getProfile,
    updateBasicInfo,
    updateSkills,
    addSkills,
    removeSkills,
    updateEducation,
    updateExperience,
    uploadResume,
    saveJob,
    removeSavedJob,
    getSavedJob,


} = require("../controllers/jobSeeker")

const {auth , isjobSeeker}  = require("../middlewares/auth");


router.use(auth, isjobSeeker);




router.get("/profile",getProfile);
router.put("/update-basic",updateBasicInfo);


router.put("/update-skills",updateSkills),
router.post("/add-skills",addSkills);
router.delete("/remove-skills",removeSkills);


router.put("/update-education",updateEducation);


router.put("/update-experience",updateExperience);


router.post("/upload-resume",uploadResume);


router.post("/save-job",saveJob);
router.delete("/remove-saved-job",removeSavedJob);
router.get("/get-saved-job",getSavedJob);

module.exports= router;





