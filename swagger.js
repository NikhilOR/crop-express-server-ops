// swagger.js
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const { cropList } = require("./enums/cropEnum"); // 👉 your enum list

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Crop Dashboard API",
      version: "1.0.0",
      description: "API for crop dashboard with farmer and buyer responses",
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Development server",
      },
    ],
    components: {
      // 🔐 API Key Security Scheme

      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-api-key", // 👈 header name
        },
      },
      schemas: {
        Crop: {
          type: "object",
          properties: {
            name: { type: "string", enum: cropList }, // enum used here
            createdAt: { type: "string", format: "date-time" },
          },
          required: ["name"],
        },

        FarmerResponse: {
          type: "object",
          properties: {
            userId: { type: "string", example: "user123" },
            // IMPORTANT: no top-level example object for the entire schema
            cropName: { type: "string", enum: cropList }, // enum -> dropdown
            isReadyToHarvest: { type: "boolean", example: true },
            quantity: { type: "string", example: "500kg" },
            variety: { type: "string", example: "Basmati" },
            nextHarvestDate: {
              type: "string",
              format: "date",
              example: "2025-10-01",
            },
            expectedPrice: { type: "number", example: 2500 },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
          required: [
            "userId",
            "cropName",
            "isReadyToHarvest",
            "quantity",
            "variety",
            "nextHarvestDate",
            "expectedPrice",
          ],
        },

        BuyerResponse: {
          type: "object",
          properties: {
            userId: { type: "string", example: "buyer456" },
            buyingFrom: {
              type: "string",
              enum: ["farmer", "aggregator"],
              example: "farmer",
            },
            regions: {
              type: "array",
              items: { type: "string", example: "Punjab" },
            },
            cropName: { type: "string", enum: cropList }, // enum -> dropdown
            quantityCanDeal: { type: "string", example: "1000kg" },
            expectedPrice: { type: "number", example: 2200 },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
          required: [
            "userId",
            "buyingFrom",
            "regions",
            "cropName",
            "quantityCanDeal",
            "expectedPrice",
          ],
        },
      },
    },
        security: [
      {
        ApiKeyAuth: [], // 👈 ye add karna zaroori hai
      },
    ],
  },
  apis: [path.join(__dirname, "./routes/*.js")], // routes ke docs yahan se read honge
};

const specs = swaggerJsDoc(options);

module.exports = { swaggerUi, specs };
