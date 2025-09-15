// middlewares/apiKeyAuth.js

require("dotenv").config(); // .env file load karne ke liye

function apiKeyAuth(req, res, next) {
  const apiKey = req.header("x-api-key");

  if (!apiKey) {
    return res.status(401).json({ message: "API key missing" });
  }

  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({ message: "Invalid API key" });
  }

  next(); // sab sahi hai to next middleware ya route handler call karo
}

module.exports = apiKeyAuth;
