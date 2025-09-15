require("dotenv").config();   // 👈 sabse top pe add karo

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { swaggerUi, specs } = require('./swagger');
const apiKeyAuth = require("./apiKeyAuth");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Atlas connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Swagger Setup
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, null, {
    swaggerOptions: {
      defaultModelRendering: 'model',
    },
  })
);

// Routes with API key middleware
app.use('/crops', apiKeyAuth, require('./routes/cropRoutes'));
app.use('/farmer', apiKeyAuth, require('./routes/farmerRoutes'));
app.use('/buyer', apiKeyAuth, require('./routes/buyerRoutes'));

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📘 Swagger docs: http://localhost:${PORT}/api-docs`);
});
