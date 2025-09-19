const FarmerResponse = require('../models/FarmerResponse');

exports.addResponse = async (req, res) => {
  try {
    const {
      userId,
      cropName,
      isReadyToHarvest,
      quantity,
      quantityUnit,
      variety,
      nextHarvestDate,
      expectedPrice,
      priceUnit,
    } = req.body;

    const response = new FarmerResponse({
      userId,
      cropName,
      isReadyToHarvest: isReadyToHarvest === "true" || isReadyToHarvest === true,
      quantity: quantity || undefined,       // ✅ sirf number
      quantityUnit: quantityUnit || undefined,
      variety,
      nextHarvestDate: nextHarvestDate ? new Date(nextHarvestDate) : undefined,
      expectedPrice: expectedPrice || undefined,  // ✅ sirf number
      priceUnit: priceUnit || undefined,
    });

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

    const updateData = {
      userId: req.body.userId,
      cropName: req.body.cropName,
      isReadyToHarvest: req.body.isReadyToHarvest === "true" || req.body.isReadyToHarvest === true,
      quantity: req.body.quantity || undefined,
      quantityUnit: req.body.quantityUnit || undefined,
      variety: req.body.variety,
      nextHarvestDate: req.body.nextHarvestDate ? new Date(req.body.nextHarvestDate) : undefined,
      expectedPrice: req.body.expectedPrice || undefined,
      priceUnit: req.body.priceUnit || undefined,
      updatedAt: new Date(),
    };

    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

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

exports.getResponseById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await FarmerResponse.findById(id);  // 👈 yaha _id
    if (!response) return res.status(404).json({ error: "Response not found" });
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

