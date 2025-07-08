const express = require("express");
const router = express.Router();

const path = require("path");
const controllerPath = path.resolve(__dirname, "../controllers/auth");

const authController = require(controllerPath);

router.post("/verify-token", authController.verifyToken);

module.exports = router;
