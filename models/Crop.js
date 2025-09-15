const mongoose = require('mongoose');
const { cropList } = require("../enums/cropEnum");

const cropSchema = new mongoose.Schema({
name: { type: String, enum: cropList, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Crop', cropSchema);
