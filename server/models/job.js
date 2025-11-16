const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,

    },

    description:{
        type:String,
        require:true,
    },

    requirements:[
        {
            type:String,
        }
    ],

    salary:{
        type:String,
    },

    jobType:{
        type:String,
    },

    experienceLevel:{
        type:String,
    },

    location:{
        type:String,
    },

    companyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"company",
        require:true,

    },

    applicants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"application",
    }],

    isPremiumBoosted: { 
        type: Boolean, 
        default: false 
    },

},{timestamps:true});

module.exports = mongoose.model("job",jobSchema);