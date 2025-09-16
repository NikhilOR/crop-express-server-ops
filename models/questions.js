const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  cropName: {
    type: String,
    required: true,
  },
  identity: {
    type: String, // buyer / farmer
    required: true,
  },
  questions: [
    {
      questionText: { type: String, required: true },
      isSupportOnly: { type: Boolean, default: false }, 
      // true => "According to you, broker/aggregator" jaise support wale
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("QuestionBank", questionSchema);
