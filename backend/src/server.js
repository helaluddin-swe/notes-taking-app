const express = require("express");
const app = express();
const dotenv = require("dotenv");
const noteRoutes = require("./routes/notesRoutes.js");
const connectDB = require("./config/db.js");
const rateLimiter = require("./middleware/rateLimiter.js");
const cors = require("cors");
const path = require("path");
const __dirnameLocal = path.resolve();

dotenv.config();

// CORS (Development Only)
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  )}


// Global Middlewares
app.use(express.json());
app.use(rateLimiter);

// API Routes
app.use("/api/notes", noteRoutes);

// Serve React Frontend in Production


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirnameLocal, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirnameLocal, "../frontend","/dist","index.html"));
  });
}

// Start Server
const PORT = process.env.PORT || 5001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
