const Crop = require('../models/Crop');

exports.getCrops = async (req, res) => {
  try {
    const crops = await Crop.find().sort({ name: 1 });
    res.json(crops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addCrop = async (req, res) => {
  try {
    const { name } = req.body;
    const crop = new Crop({ name });
    await crop.save();
    res.status(201).json(crop);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.initCrops = async (req, res) => {
  try {
    const defaultCrops = [
      'Rice', 'Wheat', 'Corn', 'Sugarcane', 'Cotton', 
      'Soybeans', 'Barley', 'Millets', 'Pulses', 'Mustard'
    ];
    for (const cropName of defaultCrops) {
      await Crop.findOneAndUpdate({ name: cropName }, { name: cropName }, { upsert: true });
    }
    res.json({ message: 'Default crops initialized successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
