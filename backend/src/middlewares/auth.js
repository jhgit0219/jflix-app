const admin = require("../config/firebase");
const User = require("../models/User");
const HTTP = require("../constants/httpStatus");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(HTTP.UNAUTHORIZED).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);

    let user = await User.findOne({ firebaseUid: decoded.uid });

    if (!user) {
      user = await User.create({
        firebaseUid: decoded.uid,
        email: decoded.email,
        displayName: decoded.name || "",
        photoURL: decoded.picture || "",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(HTTP.UNAUTHORIZED).json({ message: "Invalid or expired token" });
  }
};

module.exports = authenticate;
