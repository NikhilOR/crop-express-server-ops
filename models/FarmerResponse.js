const mongoose = require('mongoose');
const { cropList } = require("../enums/cropEnum");

const farmerResponseSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  cropName: { type: String, enum: cropList, required: true },
  isReadyToHarvest: { type: Boolean, required: true },
  quantity: { type: String, required: true },
  variety: { type: String, required: true },
  nextHarvestDate: { type: Date, required: true },
  expectedPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FarmerResponse', farmerResponseSchema);
