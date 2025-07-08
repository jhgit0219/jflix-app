const User = require("../models/User"); // ✅
const authService = require("../services/authService");

async function verifyToken(req, res) {
  try {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ error: "Missing ID token" });

    const decoded = await authService.verifyFirebaseToken(idToken);

    // 🧠 Store in MongoDB
    let user = await User.findOne({ firebaseUid: decoded.uid });
    if (!user) {
      user = await User.create({
        firebaseUid: decoded.uid,
        email: decoded.email,
        displayName: decoded.name || "",
        photoURL: decoded.picture || "",
      });
    }

    res.status(200).json({
      uid: user.firebaseUid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(500).send("verifyToken crashed");
  }
}
