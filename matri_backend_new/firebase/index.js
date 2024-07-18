const firebase = require("firebase-admin");
const serviceAccount = require("../dukan-db-firebase-adminsdk-xyqcs-f2ca085157.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    //         // storageBucket: "vaishakhi-matrimony.appspot.com", 
    storageBucket: "gs://dukan-db.appspot.com",
});

module.exports = { firebase };