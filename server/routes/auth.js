const express = require("express");
const router = express.Router();

const { signUpjobSeeker,
        signUpcompany,
        signUpadmin,
        login
} = require("../controllers/auth");

const {  auth,
         isjobSeeker,
         isCompany,
         isAdmin

} = require("../middlewares/auth");

router.post("/signup-jobseeker",signUpjobSeeker);
router.post("/signup-company",signUpcompany);
router.post("/signup-admin",signUpadmin);
router.post("/login",login);



router.get("/auth-check",auth, (req,res) =>{
    res.status(200).json({
        success:true,
        message:"token is valid",
        user:req.user,
    });
});

router.get("/jobseeker/dashboard" ,auth, isjobSeeker ,(req,res) =>{
    res.json({
        success:true,
        message:"welcome job seeker dashboard",
        user:req.user,
    });
});

router.get("/company/dashboard",auth,isCompany,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to company dashboard",
        user:req.user,
    });
});

router.get("/admin/dashboard", auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: "Welcome Admin Dashboard",
        user: req.user
    });
});

module.exports = router;

