const mongoose = require("mongoose");
const { cropList } = require("../enums/cropEnum"); // 👈 crop enum import kiya

const buyerResponseSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  buyingFrom: {
    type: String,
    enum: ["farmer", "aggregator"],
    required: true,
  },
  regions: [{ type: String, required: true }],
  cropName: {
    type: String,
    enum: cropList, // 👈 dropdown crops list
    required: true,
  },
  quantityCanDeal: { type: String, required: true },
  expectedPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("BuyerResponse", buyerResponseSchema);
