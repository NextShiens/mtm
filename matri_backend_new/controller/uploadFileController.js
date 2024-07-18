const express = require("express");
const app = express();
const serviceAccount = require("../dukan-db-firebase-adminsdk-xyqcs-f2ca085157.json");
const fs = require("fs");
const admin = require("firebase-admin");


const bucket = admin.storage().bucket();


const uploadFileController = {
  async uploadFile(req, res) {
    console.log("req.file", req.file);
    try {
      if (!req.file) {
        return res.status(400).json({ status: false, message: "No file uploaded" });
      }

      const file = req.file;
      const fileName = `UserImages/${Date.now()}_${file.originalname}`;
      const fileUpload = bucket.file(fileName);

      // Read the file from the temp folder
      const fileContent = fs.readFileSync(file.path);

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
        fs.unlinkSync(file.path);
        console.log("publicUrl", publicUrl);
        res.status(200).json({ status: true, fileUrl: publicUrl });
      });

      blobStream.end(fileContent);
    } catch (error) {
      console.error("Server error:", error);
      res.status(500).json({ status: "Failure", error: error.message });
    }
  },
};

module.exports = uploadFileController;
