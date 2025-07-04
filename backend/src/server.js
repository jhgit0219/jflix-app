const mongoose = require("mongoose");
const app = require("./app");
const { mongoUri, port } = require("./config/config");

const PORT = port || 5000;

if (!mongoUri) {
  throw new Error("MONGODB_URI is not defined in environment variables.");
}

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
