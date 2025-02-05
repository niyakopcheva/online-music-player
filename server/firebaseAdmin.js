var admin = require("firebase-admin");

var serviceAccount = require("./music-player-28fb2-firebase-adminsdk-qcukv-5c8b811733.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
