const Job = require("../models/job");



exports.getAllJobs = async(req , res) =>{
    try{
        const jobs = await Job.find().populate("companyId").sort({createdAt:-1});
        res.status(200).json({
            success:true,
            jobs,
        });

    }catch (error) {
        console.log("GET ALL JOBS ERROR ", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};


exports.getJobById = async(req,res) =>{
    try{
        const{ jobId }= req.params;

        const job = await Job.findById(jobId).populate(
            "companyId",
            "companyName description"
        );

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }
        res.status(200).json({
            success: true,
            job,
        });

    }catch (error) {
        console.log("GET JOB BY ID ERROR ", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};


exports.searchJob = async (req, res) => {
  try {
    const { keyword } = req.query;

    const query = {};

    if (keyword && typeof keyword === "string") {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }

    const jobs = await Job.find(query)
      .populate("companyId", "companyName");

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });

  } catch (error) {
    console.log("SEARCH JOBS ERROR →", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



exports.filterJob = async (req, res) => {
  try {
    const { location, jobType, experienceLevel, minSalary, maxSalary } = req.query;

    const filter = {};

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    if (jobType) {
      filter.jobType = jobType;
    }

    if (experienceLevel) {
      filter.experienceLevel = experienceLevel;
    }

    if (minSalary || maxSalary) {
      filter.salary = {};
      if (minSalary) filter.salary.$gte = Number(minSalary);
      if (maxSalary) filter.salary.$lte = Number(maxSalary);
    }

    const jobs = await Job.find(filter)
      .populate("companyId", "companyName");

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });

  } catch (error) {
    console.log("FILTER JOBS ERROR →", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};






