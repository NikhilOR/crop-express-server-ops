const express = require('express');
const router = express.Router();
const buyerController = require('../controllers/buyerController');

/**
 * @swagger
 * tags:
 *   name: Buyers
 *   description: API endpoints for buyer responses
 */

/**
 * @swagger
 * /buyer/responses:
 *   post:
 *     summary: Submit a buyer response
 *     tags: [Buyers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BuyerResponse'
 *     responses:
 *       201:
 *         description: Buyer response created successfully
 */
router.post('/responses', buyerController.addResponse);

/**
 * @swagger
 * /buyer/responses:
 *   get:
 *     summary: Get all buyer responses
 *     tags: [Buyers]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter buyer responses by user ID
 *     responses:
 *       200:
 *         description: List of buyer responses
 */
router.get('/responses', buyerController.getResponses);

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
router.put('/responses/:id', buyerController.updateResponse);

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
 *     responses:
 *       200:
 *         description: Buyer response deleted successfully
 */
router.delete('/responses/:id', buyerController.deleteResponse);

module.exports = router;
