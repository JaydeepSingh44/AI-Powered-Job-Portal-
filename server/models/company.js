const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true,
    },

    phone:{
        type:String,
        required:true,
    },
    
    logo:{
        type:String,
    },

    description:{
        type:String,
        
    },

    website:{
        type:String,
        
    },
    
    address:{
        type:String,
        
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