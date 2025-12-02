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

// CORS Configuration
const allowedOrigins = [
  "http://localhost:5173", // development
  "http://localhost:5001", // development
  process.env.FRONTEND_URL || "", // production (set in render.yaml)
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Global Middlewares
app.use(express.json());
app.use(rateLimiter);

// API Routes
app.use("/api/notes", noteRoutes);

// Serve React Frontend in Production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../../frontend/dist");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// Start Server
const PORT = process.env.PORT || 5001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
