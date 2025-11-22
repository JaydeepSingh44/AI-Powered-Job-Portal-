const mongoose = require("mongoose");

const applicantsSchema = new mongoose.Schema({
    jobSeekerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"jobSeeker",
        required:true,
    },

    jobId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"job",
        required:true,
    },

    resumeUrl:{
        type:String,
    },

    status:{
        type:String,
        enum:["Applied","Viewed","Shortlisted","Rejected","Hired"],
        default:"Applied",
    },

    notes:{
        type:String,

    },

},{timestamps:true});

module.exports = mongoose.model("application",applicantsSchema);