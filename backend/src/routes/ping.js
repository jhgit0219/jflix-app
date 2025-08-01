const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const timestamp = new Date().toISOString();

  res.json({ message: "Pong", timestamp });
});

module.exports = router;
