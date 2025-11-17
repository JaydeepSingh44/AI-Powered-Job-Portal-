const jwt = require("jsonwebtoken0");
require("dotenv").config();

exports.auth = (req,res,next) => {
    try{
        const token = req.body.token || req.cookies.token;

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token missing",
            });
        }

        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log("decoded token", decode);

            res.user=decode;

        }catch(error){
            return res.status(401).json({
                success:false,
                message:"token is invalid",
            });
        }

        next();
        

    }catch(error){
        console.log(error);
        return res.status(401).json({
                success:false,
                message:"something went wrong while verifying token",
            });

    }
};


exports.isjobSeeker = (req,res,next) =>{
    try{
        if(req.user.role !== "jobseeker"){
            return res.status(401).json({
                success:false,
                message:"protected route for job seekers only",
            });
        }
        next();

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"user role is not matching",
        });
    }
};

exports.isCompany = (req,res,next) =>{
    try{
        if(req.user.role !=="company") {
        return res.status(401).json({
            success:false,
            message:"protected route for companies only",
        })
        }

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"user role is not matching",
        });
    }

};

exports.isAdmin = (req,res,next) => {
    try{
        if(req.user.role !== "admin"){
           return res.status(401).json({
            success:false,
            message:"protected route for Admins only",
        });
    }
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"user role is not matching",
        });
    }
};



