const mongoose = require("mongoose");
const jobSeeker = require("./jobSeeker");

const savedJobsSchema = new mongoose.Schema({
    jobSeekerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"jobSeeker",
        require:true,

    },

    jobId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"job",
        require:"true",
    },

},{timestamps:true});

module.exports = mongoose.model("savedJobs",savedJobsSchema);