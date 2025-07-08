const express = require("express");
const admin = require("../config/firebase"); // your admin SDK
const router = express.Router();

router.get("/ping-firebase", async (req, res) => {
  try {
    const user = await admin.auth().getUser("XobDtTZ3ftSVjkJQMiSAr8He50k2");
    res.json({
      uid: user.uid,
      email: user.email,
      project: admin.app().options.projectId,
    });
  } catch (err) {
    console.error("🔥 Firebase Admin test failed:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
