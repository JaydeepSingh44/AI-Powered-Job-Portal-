const Company = require("../models/company");
const Job = require("../models/job");


exports.getCompanyProfile = async(req ,res)=>{
    try{

        const companyId = req.user.id;

        const profile = await Company.findById(companyId);

        if(!profile){
            return res.status(404).json({
                success:false,
                message:"company profile not found",
            });
        }

        res.status(200).json({
            success:true,
            profile,
        });


    }catch(error){
        console.log("Get compant profile errror",error);
        res.status(500).json({
            success:false,
            message:"Server error"

        });
        
    }

};



exports.updateCompanyInfo = async(req,res) =>{
    try{
        const companyId = req.user.id;

        const { companyName , phone , website , address} = req.body;

        const updated  = await Company.findByIdAndUpdate(
            companyId,
            {companyName , phone , website , address },
            {new:true},
        );
        res.status(200).json({
            success:true,
            message:"compant info updated",
            updated,
        });

    }catch (error) {
        console.log("UPDATE COMPANY INFO ERROR ", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error" 
        });
  }
};


exports.updateDescription = async(req,res) =>{
    try{
        const companyId = req.user.id;

        const { description } = req.body;

        const updated = await Company.findByIdAndUpdate(
            companyId,
            { description},
            {new:true},
        );

        res.status(200).json({
            success:true,
            message:"Description updated successfully",
            updated,
        });

    }catch (error) {
        console.log("UPDATE DESCRIPTION ERROR ", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error" 
        });
  }
};



exports.createJob = async(req,res) =>{
    try{
        const companyId = req.user.id;
        const {title , 
              description, 
              requirements, 
              salary,
              jobType,
              experienceLevel,
              location,

        }= req.body;

        const job = await Job.create({
            title , 
              description, 
              requirements, 
              salary,
              jobType,
              experienceLevel,
              location,
              companyId,
        });

        await Company.findByIdAndUpdate(
            companyId,
            {$push:{jobsPosted:job._id}}
        );
        res.status(201).json({
            success: true,
            message: "Job created",
            job,
        });
    } 
    catch (error) {
        console.log("CREATE JOB ERROR ", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error" 
        });
  }
};


exports.updateJob = async(req,res) => {
    try{
        const companyId = req.user.id;
        const { jobId } = req.params;

        const job = await Job.findByIdAndUpdate(
            {_id: jobId,
                companyId:companyId
            },
            req.body,
            {new:true}
        );

        if(!job){
            return res.status(404).json({
                success:false,
                message:"job not founded or unauthorised"
            });
        }
        res.status(200).json({
            success: true,
            message: "Job updated",
            job,
        });
    }
    catch (error) {
        console.log("UPDATE JOB ERROR ", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error" 
        });
    }
};



exports.deleteJob = async(req,res) =>{
    try{
         const companyId = req.user.id;
         const {jobId} = req.params;
         
         const job = await Job.findByIdAndDelete(
            {_id : jobId ,
            companyId:companyId
        }
    );
    if(!job){
        return res.status(404).json({
            success:false,
            message:"Job not found or unauthorized",
        });
    }

    await Company.findByIdAndUpdate(
        companyId,
        {$pull:{jobsPosted:jobId}}
    );

    res.status(200).json({
      success: true,
      message: "Job deleted",
    });
}
 catch (error) {
    console.log("DELETE JOB ERROR ", error);
    res.status(500).json({ 
        success: false, 
        message: "Server error" });
  };
};


exports.getCompanyJob = async(req,res) => {
    try{
        const companyId = req.user.id;

        const jobs = await Job.find({companyId});

        res.status(200).json({
            success: true,
            jobs,
        });
    }catch(error) {
        console.log("GET COMPANY JOBS ERROR ", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error" 
        });
  }
};
    
   



