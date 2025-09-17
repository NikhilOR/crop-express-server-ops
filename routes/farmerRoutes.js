const express = require('express');
const router = express.Router();
const farmerController = require('../controllers/farmerController');

/**
 * @swagger
 * tags:
 *   name: Farmers
 *   description: API endpoints for farmer responses
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FarmerResponse:
 *       type: object
 *       required:
 *         - userId
 *         - cropName
 *         - isReadyToHarvest
 *         - quantity
 *         - quantityUnit
 *         - expectedPrice
 *         - priceUnit
 *       properties:
 *         userId:
 *           type: string
 *           description: ID of the user (farmer)
 *         cropName:
 *           type: string
 *           description: Name of the crop
 *         isReadyToHarvest:
 *           type: boolean
 *           description: Whether the crop is ready to harvest
 *         quantity:
 *           type: number
 *           description: Quantity of crop (numeric value only, e.g. 500)
 *         quantityUnit:
 *           type: string
 *           description: Unit of quantity (e.g. "kg", "quintal", "ton")
 *         variety:
 *           type: string
 *           description: Variety of the crop (optional)
 *         nextHarvestDate:
 *           type: string
 *           format: date
 *           description: Expected date of next harvest
 *         expectedPrice:
 *           type: number
 *           description: Expected price (numeric value only, e.g. 2500)
 *         priceUnit:
 *           type: string
 *           description: Unit of price (e.g. "per kg", "per quintal")
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /farmer/responses:
 *   post:
 *     summary: Submit a farmer response
 *     tags: [Farmers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FarmerResponse'
 *     responses:
 *       201:
 *         description: Farmer response created successfully
 */
router.post('/responses', farmerController.addResponse);

/**
 * @swagger
 * /farmer/responses:
 *   get:
 *     summary: Get all farmer responses
 *     tags: [Farmers]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter farmer responses by user ID
 *     responses:
 *       200:
 *         description: List of farmer responses
 */
router.get('/responses', farmerController.getResponses);

/**
 * @swagger
 * /farmer/responses/{id}:
 *   put:
 *     summary: Update a farmer response by ID
 *     tags: [Farmers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Farmer response ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FarmerResponse'
 *     responses:
 *       200:
 *         description: Farmer response updated successfully
 */
router.put('/responses/:id', farmerController.updateResponse);

/**
 * @swagger
 * /farmer/responses/{id}:
 *   delete:
 *     summary: Delete a farmer response by ID
 *     tags: [Farmers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Farmer response ID
 *     responses:
 *       200:
 *         description: Farmer response deleted successfully
 */
router.delete('/responses/:id', farmerController.deleteResponse);

module.exports = router;
