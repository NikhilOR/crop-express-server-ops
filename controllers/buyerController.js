const BuyerResponse = require("../models/BuyerResponse");
const QuestionBank = require("../models/questions");

// 1️⃣ Create Buyer Response
exports.createBuyerResponse = async (req, res) => {
  try {
    const { userId, cropName, answers } = req.body;

    if (!userId || !cropName || !answers) {
      return res.status(400).json({ message: "userId, cropName and answers are required" });
    }

    // Check crop specific questions
    let questionSet = await QuestionBank.findOne({ identity: "buyer", cropName });
    if (!questionSet) {
      questionSet = await QuestionBank.findOne({ identity: "buyer", cropName: "default" });
    }

    if (!questionSet) {
      return res.status(404).json({ message: "No questions available for this crop or default" });
    }

    // Validate answers
    const validQuestionIds = questionSet.questions.map(q => q._id.toString());
    const filteredAnswers = answers.filter(ans => validQuestionIds.includes(ans.questionId));

    // Save response
    const newResponse = new BuyerResponse({
      userId,
      cropName,
      answers: filteredAnswers,
    });

    await newResponse.save();

    res.status(201).json({
      message: "Buyer response saved successfully",
      data: newResponse,
    });
  } catch (error) {
    console.error("❌ Error saving buyer response:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 2️⃣ Get All Buyer Responses
exports.getAllBuyerResponses = async (req, res) => {
  try {
    const responses = await BuyerResponse.find();
    res.json(responses);
  } catch (error) {
    console.error("❌ Error fetching buyer responses:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 3️⃣ Get Buyer Response by User (with questions populated)
exports.getBuyerResponsesByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const responses = await BuyerResponse.find({ userId })
      .populate("answers.questionId", "questionText"); // sirf text chahiye

    if (!responses.length) {
      return res.status(404).json({ message: "No responses found for this user" });
    }

    res.json(responses);
  } catch (error) {
    console.error("❌ Error fetching buyer responses by user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 4️⃣ Update Buyer Response
exports.updateBuyerResponse = async (req, res) => {
  try {
    const { id } = req.params;
    const { answers, supportDecision } = req.body;

    const updatedResponse = await BuyerResponse.findByIdAndUpdate(
      id,
      { answers, supportDecision, updatedAt: Date.now() },
      { new: true }
    ).populate("answers.questionId", "questionText");

    if (!updatedResponse) {
      return res.status(404).json({ message: "Buyer response not found" });
    }

    res.json({
      message: "Buyer response updated successfully",
      data: updatedResponse,
    });
  } catch (error) {
    console.error("❌ Error updating buyer response:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 5️⃣ Delete Buyer Response
exports.deleteBuyerResponse = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await BuyerResponse.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Buyer response not found" });
    }

    res.json({ message: "Buyer response deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting buyer response:", error);
    res.status(500).json({ message: "Server error" });
  }
};
