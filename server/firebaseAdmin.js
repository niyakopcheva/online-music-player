//const { initializeApp } = require('firebase-admin/app');
var admin = require("firebase-admin");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(require('./music-player-28fb2-firebase-adminsdk-qcukv-f71ebc3630.json')),
});

// Function to assign a role
async function setUserRole(uid, role) {
  try {
    await admin.auth().setCustomUserClaims(uid, { role });
    console.log(`Successfully set role ${role} for user ${uid}`);
  } catch (error) {
    console.error('Error setting custom claims:', error);
  }
}

// Fetch and log the user's custom claims
async function fetchUserClaims(uid) {
  try {
    const user = await admin.auth().getUser(uid);
    console.log(user.customClaims); // Should show { role: 'admin' }
  } catch (error) {
    console.error('Error fetching user claims:', error);
  }
}

// Example: Assign the "admin" role to a user
//setUserRole('RyKWyPSxvgfUSTLK1GeBLMBtKPe2', 'admin'); // niya@gmail.com
//setUserRole('OWyKbLnurSeax5El0QNktKQ6AFC3', 'admin');
fetchUserClaims('OWyKbLnurSeax5El0QNktKQ6AFC3') // Should show { role: 'admin' }






