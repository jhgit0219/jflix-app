const admin = require("firebase-admin");
const { firebase } = require("./config");

admin.initializeApp({
  credential: admin.credential.cert(firebase),
});

module.exports = admin;
