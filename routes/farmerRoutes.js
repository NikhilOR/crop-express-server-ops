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
