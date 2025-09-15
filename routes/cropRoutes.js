const express = require('express');
const router = express.Router();
const cropController = require('../controllers/cropController');

/**
 * @swagger
 * tags:
 *   name: Crops
 *   description: API endpoints for managing crops
 */

/**
 * @swagger
 * /api/crops:
 *   get:
 *     summary: Get all crops
 *     tags: [Crops]
 *     responses:
 *       200:
 *         description: List of crops
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Crop'
 */
router.get('/', cropController.getCrops);

/**
 * @swagger
 * /api/crops:
 *   post:
 *     summary: Add a new crop
 *     tags: [Crops]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Crop'
 *     responses:
 *       201:
 *         description: Crop created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', cropController.addCrop);

/**
 * @swagger
 * /api/crops/init:
 *   post:
 *     summary: Initialize default crops (bulk insert)
 *     tags: [Crops]
 *     responses:
 *       201:
 *         description: Crops initialized successfully
 */
router.post('/init', cropController.initCrops);

module.exports = router;
