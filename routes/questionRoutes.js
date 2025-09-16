const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionsController");

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: Manage dynamic question sets for farmers & buyers
 */

/**
 * @swagger
 * /questions:
 *   get:
 *     summary: Get dynamic questions based on identity & crop
 *     tags: [Questions]
 *     parameters:
 *       - in: query
 *         name: identity
 *         schema:
 *           type: string
 *           enum: [farmer, buyer]
 *         required: true
 *         description: Type of user
 *       - in: query
 *         name: cropName
 *         schema:
 *           type: string
 *         required: true
 *         description: Crop name
 *     responses:
 *       200:
 *         description: List of questions
 */
router.get("/", questionController.getQuestions);

/**
 * @swagger
 * /questions/all:
 *   get:
 *     summary: Get all question sets
 *     tags: [Questions]
 *     responses:
 *       200:
 *         description: List of all question sets
 */
router.get("/all", questionController.getAllQuestions);

/**
 * @swagger
 * /questions:
 *   get:
 *     summary: Get dynamic questions based on identity & crop
 *     tags: [Questions]
 *     parameters:
 *       - in: query
 *         name: identity
 *         schema:
 *           type: string
 *           enum: [farmer, buyer]
 *         required: true
 *         description: Type of user
 *       - in: query
 *         name: cropName
 *         schema:
 *           type: string
 *         required: true
 *         description: Crop name
 *     responses:
 *       200:
 *         description: List of questions
 */
router.get("/", questionController.getQuestions);

/**
 * @swagger
 * /questions:
 *   post:
 *     summary: Create a new question set
 *     tags: [Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identity:
 *                 type: string
 *                 enum: [farmer, buyer]
 *               cropName:
 *                 type: string
 *               questions:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Question set created successfully
 */
router.post("/", questionController.createQuestion);

/**
 * @swagger
 * /questions/{id}:
 *   put:
 *     summary: Update a question set by ID
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Question set ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identity:
 *                 type: string
 *                 enum: [farmer, buyer]
 *               cropName:
 *                 type: string
 *               questions:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Question set updated successfully
 */
router.put("/:id", questionController.updateQuestion);

/**
 * @swagger
 * /questions/{id}:
 *   delete:
 *     summary: Delete a question set by ID
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Question set ID
 *     responses:
 *       200:
 *         description: Question set deleted successfully
 */
router.delete("/:id", questionController.deleteQuestion);

module.exports = router;
