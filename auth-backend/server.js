require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const path = require("path");

// Import all route files
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const volunteerRoutes = require("./routes/volunteerRoutes");
const bloodBankRoutes = require("./routes/bloodBankRoutes");
const bloodRoutes = require("./routes/bloodRoutes");
const bloodRequestRoutes = require("./routes/BloodRequestRoutes");
const memberRoutes = require("./routes/memberRoutes");

// Initialize Express app
const app = express();
const httpServer = createServer(app);

// Socket.IO configuration
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
  connectionStateRecovery: {
    maxDisconnectionDuration: 2 * 60 * 1000, // 2 minutes
    skipMiddlewares: true,
  },
});

// Enhanced CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
  })
);

// Database connection with updated options
mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/bloodDonationDB",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }
  )
  .then(() => {
    console.log("✅ MongoDB connected successfully");

    // Create indexes after connection
    mongoose.connection.db
      .collection("bloodbanks")
      .createIndexes([{ key: { location: "2dsphere" } }]);
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Make io accessible in routes
app.set("io", io);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/blood-banks", bloodBankRoutes);
app.use("/api/blood", bloodRoutes);
app.use("/api/blood-requests", bloodRequestRoutes);
app.use("/api/members", memberRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    websocket: io.engine.clientsCount,
    timestamp: new Date().toISOString(),
  });
});

// Test route
app.get("/", (req, res) => {
  res.send("Blood Donation System API");
});

// Socket.IO events
io.on("connection", (socket) => {
  console.log(`🔌 New client connected: ${socket.id}`);

  socket.on("disconnect", (reason) => {
    console.log(`❌ Client disconnected (${socket.id}): ${reason}`);
  });

  socket.on("error", (err) => {
    console.error(`⚠️ Socket error (${socket.id}):`, err);
  });

  // Custom events
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`🚪 Client ${socket.id} joined room ${roomId}`);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Server startup
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(` Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(` API Base URL: http://localhost:${PORT}/api`);
  console.log(` WebSocket URL: ws://localhost:${PORT}`);
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\n Shutting down gracefully...");

  mongoose.connection
    .close(false)
    .then(() => {
      console.log("✅ MongoDB connection closed");
      httpServer.close(() => {
        console.log("✅ HTTP server closed");
        process.exit(0);
      });
    })
    .catch((err) => {
      console.error("❌ Error during shutdown:", err);
      process.exit(1);
    });
});
