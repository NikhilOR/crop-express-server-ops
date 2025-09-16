const express = require("express");
const router = express.Router();
const buyerController = require("../controllers/buyerController");
const QuestionBank = require("../models/questions");
const BuyerResponse = require("../models/BuyerResponse");


/**
 * @swagger
 * tags:
 *   name: Buyers
 *   description: API endpoints for buyer responses
 */

// /**
//  * @swagger
//  * /buyer/responses:
//  *   post:
//  *     summary: Submit a buyer response
//  *     tags: [Buyers]
//  *     parameters:
//  *       - in: query
//  *         name: cropName
//  *         schema:
//  *           type: string   # ✅ enum inject hoga swagger.js se
//  *         required: true
//  *         description: Crop name
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/BuyerResponse'
//  *     responses:
//  *       201:
//  *         description: Buyer response created successfully
//  */
// router.post("/responses", buyerController.createBuyerResponse);

/**
 * @swagger
 * /buyer/responses:
 *   get:
 *     summary: Get all buyer responses (optionally filter by userId and cropName)
 *     tags: [Buyers]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter buyer responses by user ID
 *       - in: query
 *         name: cropName
 *         schema:
 *           type: string   # ✅ enum inject hoga swagger.js se
 *         description: Filter buyer responses by crop name
 *     responses:
 *       200:
 *         description: List of buyer responses
 */
router.get("/responses", async (req, res) => {
  if (req.query.userId) {
    return buyerController.getBuyerResponsesByUser(req, res);
  }
  return buyerController.getAllBuyerResponses(req, res);
});

/**
 * @swagger
 * /buyer/responses/{id}:
 *   put:
 *     summary: Update a buyer response by ID
 *     tags: [Buyers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Buyer response ID
 *       - in: query
 *         name: cropName
 *         schema:
 *           type: string   # ✅ enum inject hoga swagger.js se
 *         description: Crop name
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BuyerResponse'
 *     responses:
 *       200:
 *         description: Buyer response updated successfully
 */
router.put("/responses/:id", buyerController.updateBuyerResponse);

/**
 * @swagger
 * /buyer/responses/{id}:
 *   delete:
 *     summary: Delete a buyer response by ID
 *     tags: [Buyers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Buyer response ID
 *       - in: query
 *         name: cropName
 *         schema:
 *           type: string   # ✅ enum inject hoga swagger.js se
 *         description: Crop name
 *     responses:
 *       200:
 *         description: Buyer response deleted successfully
 */
router.delete("/responses/:id", buyerController.deleteBuyerResponse);

/**
 * @swagger
 * /buyer/responses:
 *   post:
 *     summary: Submit a buyer response
 *     tags: [Buyers]
 *     parameters:
 *       - in: query
 *         name: cropName
 *         schema:
 *           type: string
 *         required: true
 *         description: Crop name
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionId:
 *                       type: string
 *                     answer:
 *                       type: string
 *     responses:
 *       201:
 *         description: Buyer response created successfully
 */
router.post("/responses/with-questions", async (req, res) => {
  try {
    let { cropName } = req.query;
    let { userId, answers, identity } = req.body; // 👈 identity bhi body se aayegi

    if (!cropName || !userId || !identity) {
      return res.status(400).json({ message: "cropName, userId, identity required" });
    }

    cropName = cropName.toLowerCase();
    identity = identity.toLowerCase();

    // 🔹 Step 1: get questions for crop
    let questionSet = await QuestionBank.findOne({ cropName, identity });
    if (!questionSet) {
      questionSet = await QuestionBank.findOne({ cropName: "default", identity });
    }
    if (!questionSet) {
      return res.status(404).json({ message: "No questions found for this crop/identity" });
    }

    // 🔹 Step 2: map answers to questions
    const finalAnswers = questionSet.questions.map((q) => {
      const userAns = answers.find((a) => String(a.questionId) === String(q._id));
      return {
        questionId: q._id,
        answer: userAns ? userAns.answer : null, // agar user ne skip kiya
      };
    });

    // 🔹 Step 3: save BuyerResponse
    const responseDoc = new BuyerResponse({
      userId,
      cropName,
      answers: finalAnswers,
    });

    await responseDoc.save();

    res.status(201).json({
      message: "Buyer response created successfully",
      data: responseDoc,
    });
  } catch (err) {
    console.error("❌ Error creating buyer response:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @swagger
 * /buyer/questions:
 *   get:
 *     summary: Get buyer questions for a specific crop
 *     tags: [Buyers]
 *     parameters:
 *       - in: query
 *         name: cropName
 *         schema:
 *           type: string
 *         required: true
 *         description: Crop name
 *       - in: query
 *         name: identity
 *         schema:
 *           type: string
 *         required: true
 *         description: Identity (e.g. "buyer")
 *     responses:
 *       200:
 *         description: List of questions for the crop
 */
router.get("/questions", async (req, res) => {
  try {
    let { cropName, identity } = req.query;

    if (!cropName || !identity) {
      return res.status(400).json({ message: "cropName and identity are required" });
    }

    cropName = cropName.toLowerCase();
    identity = identity.toLowerCase();

    // Exact match for crop
    let questionSet = await QuestionBank.findOne({ cropName, identity });

    // Fallback to default
    if (!questionSet) {
      questionSet = await QuestionBank.findOne({ cropName: "default", identity });
    }

    if (!questionSet) {
      return res.status(404).json({ message: "No questions found" });
    }

    res.json({
      cropName,
      identity,
      questions: questionSet.questions,
    });
  } catch (err) {
    console.error("❌ Error fetching questions:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ---------------- NEW ENDPOINT (without swagger) ---------------- //

router.post("/responses/with-questions", async (req, res) => {
  try {
    let { cropName } = req.query;
    let { userId, answers, identity } = req.body;

    if (!cropName || !userId || !identity) {
      return res.status(400).json({ message: "cropName, userId, identity required" });
    }

    cropName = cropName.toLowerCase();
    identity = identity.toLowerCase();

    // Step 1: get questions
    let questionSet = await QuestionBank.findOne({ cropName, identity });
    if (!questionSet) {
      questionSet = await QuestionBank.findOne({ cropName: "default", identity });
    }
    if (!questionSet) {
      return res.status(404).json({ message: "No questions found for this crop/identity" });
    }

    // Step 2: map answers
    const finalAnswers = questionSet.questions.map((q) => {
      const userAns = answers.find((a) => String(a.questionId) === String(q._id));
      return {
        questionId: q._id,
        answer: userAns ? userAns.answer : null,
      };
    });

    // Step 3: save response
    const responseDoc = new BuyerResponse({
      userId,
      cropName,
      answers: finalAnswers,
    });

    await responseDoc.save();

    res.status(201).json({
      message: "Buyer response created successfully",
      data: responseDoc,
    });
  } catch (err) {
    console.error("❌ Error creating buyer response:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ---------------- GET Questions endpoint (for testing in Postman/Chrome) ---------------- //

router.get("/questions", async (req, res) => {
  try {
    let { cropName, identity } = req.query;

    if (!cropName || !identity) {
      return res.status(400).json({ message: "cropName and identity are required" });
    }

    cropName = cropName.toLowerCase();
    identity = identity.toLowerCase();

    let questionSet = await QuestionBank.findOne({ cropName, identity });

    if (!questionSet) {
      questionSet = await QuestionBank.findOne({ cropName: "default", identity });
    }

    if (!questionSet) {
      return res.status(404).json({ message: "No questions found" });
    }

    res.json({
      cropName,
      identity,
      questions: questionSet.questions,
    });
  } catch (err) {
    console.error("❌ Error fetching questions:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

