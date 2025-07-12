const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
require("dotenv").config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 5000; // Fallback if PORT not in .env

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB(process.env.MONGO_URI);

// Sample route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from MongoDB backend" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
