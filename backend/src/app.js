const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const userRoutes = require("./routes/user");
const movieRoutes = require("./routes/movies");
const authRoutes = require("./routes/auth");

const app = express();

const testFirebaseRouter = require("./routes/test-firebase");

app.use("/api/test", testFirebaseRouter);

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/user", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
