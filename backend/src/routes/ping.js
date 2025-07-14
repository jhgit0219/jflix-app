const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const timestamp = new Date().toISOString();
  console.log(`Ping received at ${timestamp}`);
  res.json({ message: "Pong", timestamp });
});

module.exports = router;
