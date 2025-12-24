const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const noteRoutes = require("./routes/notesRoutes.js");
const connectDB = require("./config/db.js");
const rateLimiter = require("./middleware/rateLimiter.js");

dotenv.config();

const app = express();

// ====== CORS ======
const allowedOrigins = [
  "http://localhost:5174",                   // local dev
  process.env.FRONTEND_URL                   // Vercel frontend
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow Postman / server-to-server
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("CORS Error: Origin Not Allowed → " + origin));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Express JSON middleware
app.use(express.json());

// Rate limiter middleware
app.use(rateLimiter);

// ===== API Routes =====
app.use("/api/notes", noteRoutes);

// ===== Start Server =====
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log("🌐 Allowed Origins:", allowedOrigins);
  });
});
