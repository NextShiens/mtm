const express = require("express");
const app = express();
const serviceAccount = require("../vaishakhi-matrimony-firebase-adminsdk-mjr6h-34a24c9c5e.json");
const fs = require("fs");
const admin = require("firebase-admin");
const multer = require('multer');


const bucket = admin.storage().bucket();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const uploadFileController = {
  async uploadFile(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ status: false, message: "No file uploaded" });
      }

      const file = req.file;
      const fileName = `UserImages/${Date.now()}_${file.originalname}`;
      const fileUpload = bucket.file(fileName);

      const blobStream = fileUpload.createWriteStream({
        metadata: { contentType: file.mimetype },
      });

      blobStream.on('error', (error) => {
        console.error("Error uploading to Firebase:", error);
        res.status(500).json({ error: "Something went wrong uploading the file: " + error.message });
      });

      blobStream.on('finish', async () => {
        await fileUpload.makePublic();
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
        res.status(200).json({ status: true, fileUrl: publicUrl });
      });

      blobStream.end(file.buffer);
    } catch (error) {
      console.error("Server error:", error);
      res.status(500).json({ status: "Failure", error: error.message });
    }
  },
};

module.exports = uploadFileController;
