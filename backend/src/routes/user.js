const express = require("express");
const authenticate = require("../middlewares/auth");

const router = express.Router();

// GET /api/user/me
router.get("/me", authenticate, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
