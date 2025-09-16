const mongoose = require("mongoose");
const { cropList } = require("../enums/cropEnum");

const buyerResponseSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  cropName: {
    type: String,
    // enum: cropList,
    required: true,
  },
  answers: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: "QuestionBank" },
      answer: { type: String },
    },
  ],
  supportDecision: { type: String, enum: ["Broker", "Aggregator", null], default: null }, // 👈 ye support team fill karegi
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("BuyerResponse", buyerResponseSchema);
