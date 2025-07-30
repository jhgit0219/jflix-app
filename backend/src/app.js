const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const userRoutes = require("./routes/user");
const movieRoutes = require("./routes/movies");
const authRoutes = require("./routes/auth");
const pingRoutes = require("./routes/ping");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/user", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ping", pingRoutes);
module.exports = app;
