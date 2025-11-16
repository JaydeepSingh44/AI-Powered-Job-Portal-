const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  planName: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  durationDays: {
    type: Number,
    required: true
  },

  features: [
    {
        type:String,
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model("subscription", subscriptionSchema);