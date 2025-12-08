const express = require("express");
const app = express();
const dotenv = require("dotenv");
const noteRoutes = require("./routes/notesRoutes.js");
const connectDB = require("./config/db.js");
const rateLimiter = require("./middleware/rateLimiter.js");
const cors = require("cors");

dotenv.config();

// ====== CORS FIX (WORKS FOR VERCEL + RENDER + LOCAL) ======
const allowedOrigins = [
  "http://localhost:5173",          // Local Vite frontend
  process.env.FRONTEND_URL,         // Vercel frontend (from .env)
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow Postman, curl, backend requests

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.log("❌ BLOCKED ORIGIN:", origin);
    return callback(new Error("CORS Error: Origin Not Allowed"));
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// Extra headers to avoid browser preflight issues
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// ==========================================================

// Global Middlewares
app.use(express.json());
app.use(rateLimiter);

// API Routes
app.use("/api/notes", noteRoutes);

// Server Port
const PORT = process.env.PORT || 5000;

// Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log("🌐 Allowed Origins:", allowedOrigins);
  });
});
