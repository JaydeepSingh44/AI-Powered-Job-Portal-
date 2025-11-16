const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyName:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique: true
    },
    password:{
        type:String,
        require:true,
    },
    logo:{
        type:String,
    },

    description:{
        type:string,
        require:true,
    },

    website:{
        type:String,
        require:true,
    },
    
    address:{
        type:string,
        
    },
    verified: { 
        type: Boolean, 
        default: false 
    },

    jobsPosted: [
        { type: mongoose.Schema.Types.ObjectId, 
            ref: "job" 
        }
    ],

  subscriptionId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "userSubscription" ,
},

  role: { 
    type: String, 
    default: "company" 
},


}, { timestamps: true });

module.exports = mongoose.model("company", companySchema);