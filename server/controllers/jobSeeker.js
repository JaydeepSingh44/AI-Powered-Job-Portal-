const jobSeeker = require("../models/jobSeeker");
const job =require("../models/job");

//==========PROFILE==========
 

//----------get profile----------
exports.getProfile = async(req , res) =>{
    try{
        const userId = req.user.id;
        const profile = await jobSeeker.findById(userId);

        if(!profile){
            return res.status(400).json({
                success:false,
                message:"Profile not found",
            });
        }

        res.status(200).json({
            success:true,
            profile,
        });
        


    }catch(error){
        console.log("Get pofile error =",error),
        res.status(500).json({
            success:false,
            message:"serer error"
        });

    }
};


//------------update info in profile--------------- 

exports.updateBasicInfo = async(req,res)=>{
    try{
        const userId = req.user.id;
        const {name,phone} = req.body;

        const updated = await jobSeeker.findByIdAndUpdate(
            userId,
            {
                name,
                phone,
            },
            {
                new:true,
            }
        );

        res.status(200).json({
            success:true,
            message:"basic info updated",
            updated,
        });

    }catch(error){
        console.log("Update basic info Error = ",error),
        res.status(400).json({
            success:false,
            message:"server error",
        });

    }
};

//============Skills ==========

//------------Update skills------

exports.updateSkills = async(req,res) =>{
    try{
        const userId = req.user.id;
        const {skills} = req.body;

        const updated = await jobSeeker.findByIdAndUpdate(
            userId,
            { skills },
            {new:true},
        );
        res.status(200).json({
            success:true,
            message:"ASkills updated",
            updated,
        });

    }catch (error) {
    console.log("UPDATE SKILLS ERROR →", error);
    res.status(500).json({ 
        success: false, 
        message: "Server error" 
    });
  }
};

//---------------Add Skills---------

exports.addSkills = async(req,res) =>{
    try{
        const userId = req.user.id;
        const {skill} = req.body;

        const updated = await jobSeeker.findByIdAndUpdate(
            userId,
            { 
                $push: { skills: skill } },
                { new: true }
            );

            res.status(200).json({
                success:true,
                message:"Skills added",
                updated,
            });

        } catch (error) {
            console.log("ADD SKILL ERROR →", error);
            res.status(500).json({
                success: false, 
                message: "Server error" 
            });
        }
    };

//------------Remove Skill ---

exports.removeSkills = async(req,res) =>{
    try{
        const userId = req.user.id;
        const {skill} = req.body;

        const updated = await jobSeeker.findByIdAndUpdate(
            userId,
            {
                $pull:{skills:skill}
            },
        );


        res.status(200).json({ 
            success: true, 
            message: "Skill removed", 
            updated,
        
        });


    }catch (error) {
        console.log("REMOVE SKILL ERROR →", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error" });
  }
};



//--------------Updated Education-------

exports.updateEducation = async(req,res)=>{
    try{
        const userId = req.user.id;
        const {education } = req.body;

        const updated = await jobSeeker.findByIdAndUpdate(
            userId,
            {education},
            {
                new:true
            }
        );

        res.status(200).json({
            success:true,
            message:"Education Updated",
            updated,
        });

    } catch (error) {
        console.log("EDUCATION UPDATE ERROR →", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error" });
  }
};

//---------------update experience ------

exports.updateExperience = async(req,res) =>{
    try{
        userId = req.user.id;
        const {experience } = req.body;

        const updated = await jobSeeker.findByIdAndUpdate(
            userId,
            {
                experience
            },
            {new:true}
        );

        res.status(200).json({
            success:true,
            message:"Experience updated",
            updated,
        });

    } catch (error) {
        console.log("Expeience UPDATE ERROR →", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error" });
  }
};

//-----------upload Resume - --------

exports.uploadResume = async(req,res) =>{
    try{
        const userId = req.user.id;

        res.status(200).json({ 
            success: true, 
            message: "Resume upload route working" });


    }catch (error) {
        console.log("RESUME UPLOAD ERROR →", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error" 
        });
  }
};


//-----------------save Job----------

exports.saveJob = async(req,res) =>{
    try{
       const userId = req.user.id;
       const { jobId } = req.body;
       const updated = await jobSeeker.findByIdAndUpdate(
        userId,
        {$addToSet :{savedJobs:jobId}},
        {new:true},
       );

       res.status(200).json({
        success:true,
        message:"job saved",
        updated,
       })

    }catch (error) {
        console.log("SAVE JOB ERROR →", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error" });
  }
};

//-----------Remove Save Job--------

exports.removeSavedJob = async(req,res) =>{
    try{
        const userId = req.user.id;
        const { jobId } = req.body;

        const updated = await jobSeeker.findByIdAndUpdate(
            userId,
            { $pull :{ savedJobs :jobId}},
            {new:true}
        );

         res.status(200).json({ 
            success: true, 
            message: "Job removed from saved", 
            updated 
        });


    }catch (error) {
        console.log("REMOVE SAVED JOB ERROR →", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error" 
        });
  }
};


//------------get Saved Jobs ------

exports.getSavedJob = async(req,res) => {
    try{
        const userId = req.user.id;

        const user = await jobSeeker.findById(userId).populate("savedJobs");

        res.status(200).json({ 
            success: true, 
            savedJobs: user.savedJobs 
        });


    }catch (error) {
        console.log("GET SAVED JOBS ERROR →", error);
        res.status(500).json({ 
            success: false,
            message: "Server error"

        });
  }
};








