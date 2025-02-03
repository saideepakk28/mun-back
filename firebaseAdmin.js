
const admin = require("firebase-admin");

// Replace this with the path to your downloaded serviceAccountKey.json
const serviceAccount = require("./serviceac.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  
  databaseURL: "https://vasavimun-5d695-default-rtdb.asia-southeast1.firebasedatabase.app/",  // Replace with your Firebase Database URL
});

const db = admin.database();
module.exports = db;
