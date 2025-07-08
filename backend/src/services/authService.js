const admin = require("../config/firebase");

async function verifyFirebaseToken(idToken) {
  const decoded = await admin.auth().verifyIdToken(idToken);

  // TODO: Lookup/create user in DB if needed

  return {
    uid: decoded.uid,
    email: decoded.email,
    name: decoded.name || null,
  };
}

module.exports = {
  verifyFirebaseToken,
};
