const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const noteRoutes = require("./routes/notesRoutes.js");
const connectDB = require("./config/db.js");
const rateLimiter = require("./middleware/rateLimiter.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allowed Origins (Dev + Prod)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5001",
  process.env.FRONTEND_URL, // e.g. https://your-app.vercel.app
].filter(Boolean);

// ✅ Middlewares
app.use(express.json());
app.use(rateLimiter);

// ✅ Correct CORS Setup
app.use(
  cors({
    origin: (origin, callback) => {
      // allow mobile apps, curl, Postman (no origin)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS blocked"));
    },
    credentials: true,
  })
);

// ✅ API Routes
app.use("/api/notes", noteRoutes);

// ✅ Serve Frontend only in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.resolve(__dirname, "../../frontend/dist");

  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// ✅ Start server after DB connects
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();
