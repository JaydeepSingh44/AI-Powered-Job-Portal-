const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    tojobSeeker:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"jobSeeker",
    },

    tocompany:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"company",
    },

    title:{
        type:String,
        required: true
    },

    message:{
        type:String,
        required: true
    },

    type:{
        type:String,
        enum:["application", "job" , "company", "system" , "subscription"],
        required:true,
    },

    read:{
        type:{
            type:Boolean,
            default:false,
        },
    },



},{timestamps:true});

module.exports = mongoose.model("notification", notificationSchema);
