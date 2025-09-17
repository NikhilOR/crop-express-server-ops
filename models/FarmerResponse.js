const mongoose = require('mongoose');

const FarmerResponseSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  cropName: { type: String, required: true },
  isReadyToHarvest: { type: Boolean, required: true },
  quantity: { type: Number },       // ✅ sirf value
  quantityUnit: { type: String },   // ✅ unit alag
  variety: { type: String },        // optional
  nextHarvestDate: { type: Date },
  expectedPrice: { type: Number },  // ✅ sirf value
  priceUnit: { type: String },      // ✅ unit alag
}, { timestamps: true,
  versionKey: false  // to disable the "__v" field
 });

module.exports = mongoose.model('FarmerResponse', FarmerResponseSchema);
