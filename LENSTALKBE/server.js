import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { rateLimit } from "express-rate-limit";
import "dotenv/config";

import { connectDB } from "./src/config/db.js";

// Route imports
import authRoutes from "./src/routes/auth.js";
import heroRoutes from "./src/routes/hero.js";
import galleryRoutes from "./src/routes/gallery.js";
import servicesRoutes from "./src/routes/services.js";
import pillarsRoutes from "./src/routes/pillars.js";
import processRoutes from "./src/routes/process.js";
import statsRoutes from "./src/routes/stats.js";
import campaignsRoutes from "./src/routes/campaigns.js";
import blogRoutes from "./src/routes/blog.js";
import clientsRoutes from "./src/routes/clients.js";
import testimonialsRoutes from "./src/routes/testimonials.js";
import teamRoutes from "./src/routes/team.js";
import submissionsRoutes from "./src/routes/submissions.js";
import uploadRoutes from "./src/routes/upload.js";

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Connect Database ────────────────────────────────────────────────────────
connectDB();

// ─── Security Middleware ─────────────────────────────────────────────────────
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});
app.use(limiter);

// ─── General Middleware ──────────────────────────────────────────────────────
app.use(
  cors({
    origin: (process.env.CLIENT_URL || "http://localhost:5173").split(","),
    credentials: true,
  }),
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ─── Static uploads folder ───────────────────────────────────────────────────
app.use("/uploads", express.static("uploads"));

// ─── Health Check ────────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Lenstalk API is running 🚀",
    timestamp: new Date(),
  });
});

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/pillars", pillarsRoutes);
app.use("/api/process", processRoutes);
app.use("/api/company_stats", statsRoutes);
app.use("/api/campaigns", campaignsRoutes);
app.use("/api/blog_posts", blogRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/testimonials", testimonialsRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/submissions", submissionsRoutes);
app.use("/api/upload", uploadRoutes);

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`\n🚀 Lenstalk BE running on http://localhost:${PORT}`);
    console.log(`📁 Environment: ${process.env.NODE_ENV}`);
    console.log(`💾 DB: ${process.env.MONGO_URI}\n`);
  });
}

export default app;
// restart-final-v3
