require("dotenv").config();
const admin = require("firebase-admin");
const { Storage } = require("@google-cloud/storage");


const serviceAccount = {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"), // Corrigir quebra de linha
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
  };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_BUCKET,
});

const storage = new Storage({
  projectId: process.env.FIREBASE_PROJECT_ID,
  credentials: serviceAccount,
});

const bucket = storage.bucket(process.env.BUCKET);

console.log("Firebase conectado com sucesso!");

module.exports = bucket;
