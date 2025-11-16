const mongoose = require("mongoose");

const jonSeekerSchema = new mongoose({
    name:{
        type:String,
        require:true,
        trim: true
    },
    email:{
        type:String,
        require:true,
        unique: true,
        trim: true
    },


    password:{
        type:String,
        require:true,
    },


    phone:{
        type:String,
        require:true,
    },


    skills:[{
        type:String,
    }],


    education: [
    {
      institution: String,
      degree: String,
      year: Number,
    }
  ],
  
    experience: [
        {
      company: String,
      title: String,
      from: Date,
      to: Date,
        }
    ] ,

    resumeUrl:{
    type:String,
    },

    savedJobs:[
        {
            type:mongoose.Schema.Types.ObjectId, 
            ref:"job",

        }
    ],

    subscriptionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"jobSeekerSubscription",
    },
    role: {
    type: String,
    enum: ["jobseeker", "company", "admin"],
    default: "jobseeker"
    },
   

},{timestamps:true});

module.exports = mongoose.model("jobSeeker",jonSeekerSchema);