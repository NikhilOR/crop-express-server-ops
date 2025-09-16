const QuestionBank = require("../models/questions");

// 🔹 GET: Get dynamic questions based on identity & crop
exports.getQuestions = async (req, res) => {
  try {
    let { identity, cropName } = req.query;

    if (!identity || !cropName) {
      return res
        .status(400)
        .json({ message: "identity and cropName are required" });
    }

    // normalize input
    identity = identity.toLowerCase();
    cropName = cropName.toLowerCase();

    // 🔹 Step 1: Try exact match
    let questionSet = await QuestionBank.findOne({ identity, cropName });

    // 🔹 Step 2: If not found, try DEFAULT fallback
    if (!questionSet) {
      questionSet = await QuestionBank.findOne({ identity, cropName: "default" });
    }

    // 🔹 Step 3: If still not found
    if (!questionSet) {
      return res
        .status(404)
        .json({ message: "No questions found for this crop & identity" });
    }
    res.json(questionSet.questions);
  } catch (error) {
    console.error("❌ Error fetching questions:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 GET: Get all question sets
exports.getAllQuestions = async (req, res) => {
  try {
    const allQuestions = await QuestionBank.find();
    res.json(allQuestions);
  } catch (error) {
    console.error("❌ Error fetching all questions:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 POST: Create new question set
exports.createQuestion = async (req, res) => {
  try {
    let { identity, cropName, questions } = req.body;

    if (!identity || !cropName || !questions) {
      return res
        .status(400)
        .json({ message: "identity, cropName and questions are required" });
    }

    // normalize before saving
    identity = identity.toLowerCase();
    cropName = cropName.toLowerCase();

    const newSet = new QuestionBank({ identity, cropName, questions });
    await newSet.save();

    res.status(201).json({
      message: "Question set created successfully",
      data: newSet,
    });
  } catch (error) {
    console.error("❌ Error creating question set:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 PUT: Update a question set by ID
exports.updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    let { identity, cropName, questions } = req.body;

    // normalize before update
    if (identity) identity = identity.toLowerCase();
    if (cropName) cropName = cropName.toLowerCase();

    const updatedSet = await QuestionBank.findByIdAndUpdate(
      id,
      { identity, cropName, questions },
      { new: true, runValidators: true }
    );

    if (!updatedSet) {
      return res.status(404).json({ message: "Question set not found" });
    }

    res.json({
      message: "Question set updated successfully",
      data: updatedSet,
    });
  } catch (error) {
    console.error("❌ Error updating question set:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 DELETE: Delete a question set by ID
exports.deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSet = await QuestionBank.findByIdAndDelete(id);

    if (!deletedSet) {
      return res.status(404).json({ message: "Question set not found" });
    }

    res.json({ message: "Question set deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting question set:", error);
    res.status(500).json({ message: "Server error" });
  }
};
