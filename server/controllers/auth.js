const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const jobSeeker = require("../models/jobSeeker");
const company = require("../models/company");
const admin = require("../models/admin");
const jobSeeker = require("../models/jobSeeker");
const jobSeeker = require("../models/jobSeeker");
require("dotenv").config();

// --------- --------  job Seeker SignUp -------- 

exports.signUpjobSeeker = async(req ,res) =>{
    try{
        const {name, email, password , phone} = req.body;

        const existing = await jobSeeker.findOne({ email });
        if(existing){
            return res.status(400).json({
                message:"Email already registered"
            });
        }

        if(!name || !email || !password || !phone){
            return res.status(400).json({
                message:"fill all details carefully"
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const jobSeeker = await jobSeeker.create({
            name,
            email,
            password:hashPassword,
            phone,
            role:"jobSeeker",
        });

        return res.status(201).json({
            success:true,
            message:"job seeker registered succesfully",
            jobSeeker,
        });


    }
    catch(error){
        console.log("error");
        res.status(500).json({
            message:"signUp failed"
        });
    }
};


// ------------  signup for cmpy -------------

exports.signUpcompany = async (req,res) =>{
    try{
        const {companyName , email , password ,phone} = req.body;

        const existing = await company.findOne({email});

        if(existing){
            return res.status(400).json({
                message:"company already registered"
            })
        }

        if(!companyName || !email || !password || !phone) {
            return res.status(400).json({
                message:"fill all details carefully "
            });
        }

        const hashPassword = await bcrypt.hash(password,10)

        const company = await company.create({
            companyName,
            email,
            password:hashPassword,
            phone,
            role:"company",
        });

        return res.status(201).json({
            success:true,
            message:"company registered successfully",
            company,
        });


    }catch(error){
        console.log(error),
        res.status(400).json({
            message:"signUp failed"
        });

    }
};


//--------------admin signup -----------

exports.signUpadmin = async(req,res) =>{

    try{
    const {email , password, }= req.body;

    const existing = await admin.findOne({email});

    if(existing){
        return res.status(400).json({
            message:"admine already resgistered",
        });
    }

    if(!email || !password){
        return res.status(400).json({
            message:"enter all datails carefully",
        });
    }

    const hashPassword = await bcrypt.hash(password,10);

    const admin = await admin.create({
        email,
        password:hashPassword,
        role:"admin"
    });
    return res.status(201).json({
            success:true,
            message:"admine registered successfully",
            admin,
        });
    }
    catch(error){
        console.log(error),
        res.status(500).json({
            message:"login failed"
        });
    }
    
};


//-----------------------------------------
//----Login --------------
//-----------------------------------------

exports.login = async(req,res) =>{
    try{
        const{email, password} =req.body;

        let account = await jobSeeker.findOne({email}) || 
                           await company.findOne({email}) ||
                           await admin.findOne({email});
        if(!account){
            return res.status(400).json({
                message:"Account not exist",
            });
        };
        
        const passwordMatch = await bcrypt.compare(password, account.password);
        if(!passwordMatch){
            return res.status(401).json({
                message:"invalid password !! Enter again",
            });
        };
        

        const payload = {
            email : account.email,
            id : account._id,
            role : account.role
        }
        let token = jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"7d",

        });

        account = account.toObject();
        account.token = token;
        account.password = undefined;

        const options = {
            expires:new Date(Date.now() + 7*24*60*60*1000),
            httpOnly:true,
            sameSite:"lax",
        };

        res.cookie("token",token,options).status(200).json({
            success:true,
            message:"login successfully",
            token,
            role:account.role,
            user:account,
        });

        

    }catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Login failed",
        });
    }
};




