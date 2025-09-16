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
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-api-key",
        },
      },
      schemas: {
        Crop: {
          type: "object",
          properties: {
            name: { type: "string" }, // enum inject later
            createdAt: { type: "string", format: "date-time" },
          },
          required: ["name"],
        },

        FarmerResponse: {
          type: "object",
          properties: {
            userId: { type: "string", example: "user123" },
            cropName: { type: "string" }, // enum inject later
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
            cropName: { type: "string" }, // enum inject later
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
        ApiKeyAuth: [],
      },
    ],
  },
  apis: [path.join(__dirname, "./routes/*.js")],
};

const specs = swaggerJsDoc(options);

// 🔥 Centralized ENUM injection
function injectCropEnum(specs) {
  // Questions route param
  const questionsParams = specs.paths?.["/questions"]?.get?.parameters;
  if (questionsParams) {
    const cropParam = questionsParams.find((p) => p.name === "cropName");
    if (cropParam) {
      cropParam.schema.enum = cropList;
    }
  }

  // Schemas -> Crop
  if (specs.components.schemas.Crop?.properties?.name) {
    specs.components.schemas.Crop.properties.name.enum = cropList;
  }

  // 🔹 Schemas -> FarmerResponse
  if (specs.components.schemas.FarmerResponse?.properties?.cropName) {
    specs.components.schemas.FarmerResponse.properties.cropName.enum = cropList;
  }

  // 🔹 Schemas -> BuyerResponse
  if (specs.components.schemas.BuyerResponse?.properties?.cropName) {
    specs.components.schemas.BuyerResponse.properties.cropName.enum = cropList;
  }

  // 🔹 Parameters (query/path me jo cropName hai unme inject karna)
  for (const pathKey of Object.keys(specs.paths)) {
    const pathObj = specs.paths[pathKey];
    for (const methodKey of Object.keys(pathObj)) {
      const methodObj = pathObj[methodKey];
      if (methodObj.parameters) {
        methodObj.parameters.forEach((param) => {
          if (param.name === "cropName" && param.schema?.type === "string") {
            param.schema.enum = cropList; // 🚀 inject dropdown
          }
        });
      }
    }
  }
}
injectCropEnum(specs);

module.exports = { swaggerUi, specs };
