const mongoose = require("mongoose");

const chatbotSchema = new mongoose.Schema({
    jobSeekerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"jobSeeker",
    },

    message:{
        type:String,
    },

    botResponse:{
        type:String,
    },

    intent:{
        type:String,
    },

},{timestamps:true});

module.exports = mongoose.model("chatbot",chatbotSchema);

