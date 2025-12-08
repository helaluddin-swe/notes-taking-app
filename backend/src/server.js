const express = require("express");
const app = express();
const dotenv = require("dotenv");
const noteRoutes = require("./routes/notesRoutes.js");
const connectDB = require("./config/db.js");
const rateLimiter = require("./middleware/rateLimiter.js");
const cors = require("cors");

dotenv.config();

// CORS Configuration
const allowedOrigins = [
  "http://localhost:5173", // local frontend
  process.env.FRONTEND_URL, // Vercel frontend
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
      // Allow Postman / server-to-server
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS BLOCKED: Origin not allowed → " + origin));
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


const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
