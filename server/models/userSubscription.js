const mongoose = require("mongoose");

const userSubscriptionSchema = mongoose.Schema({
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
    },
    ownerType:{
        type:String,
        enum:["jobSeeker","company"],
        require:true
    },

    planId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"subscription",
        require:true,

    },

    startDate: {
    type: Date,
    default: Date.now
  },

  endDate: Date,

  status: {
    type: String,
    enum: ["active", "expired", "cancelled"],
    default: "active"
  },

  autoRenew: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model("userSubscription", userSubscriptionSchema);


