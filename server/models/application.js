const mongoose = require("mongoose");

const applicantsSchema = new mongoose.Schema({
    jobSeekerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"jobSeeker",
        require:true,
    },

    jobId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"job",
        require:true,
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

});

module.exports = mongoose.model("application",applicantsSchema);