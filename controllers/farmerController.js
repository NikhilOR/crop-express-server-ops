const FarmerResponse = require('../models/FarmerResponse');

exports.addResponse = async (req, res) => {
  try {
    const response = new FarmerResponse(req.body);
    await response.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getResponses = async (req, res) => {
  try {
    const { userId } = req.query;
    const filter = userId ? { userId } : {};
    const responses = await FarmerResponse.find(filter).sort({ createdAt: -1 });
    res.json(responses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateResponse = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body, updatedAt: new Date() };
    const response = await FarmerResponse.findByIdAndUpdate(id, updateData, { new: true });
    if (!response) return res.status(404).json({ error: 'Response not found' });
    res.json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteResponse = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await FarmerResponse.findByIdAndDelete(id);
    if (!response) return res.status(404).json({ error: 'Response not found' });
    res.json({ message: 'Response deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
