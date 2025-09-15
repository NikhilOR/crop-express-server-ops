const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { swaggerUi, specs } = require('./swagger'); // ✅ yaha se swagger import
const apiKeyAuth = require("./apiKeyAuth");


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
// app.use(apiKeyAuth);

// MongoDB Connection
mongoose.connect('mongodb+srv://nikhil_db_user:DNAMsMuBu1kjCn0p@google-sheets.ocaggbv.mongodb.net/croptestdb?retryWrites=true&w=majority&appName=google-sheets', {
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
      defaultModelRendering: 'model', // show model by default
      // tryItOutEnabled: true,
      // You can add other swaggerOptions if needed
    },
  })
);

// Routes
app.use('/crops',apiKeyAuth, require('./routes/cropRoutes'));
app.use('/farmer',apiKeyAuth, require('./routes/farmerRoutes'));
app.use('/buyer', apiKeyAuth, require('./routes/buyerRoutes'));

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📘 Swagger docs: http://localhost:${PORT}/api-docs`);
});
