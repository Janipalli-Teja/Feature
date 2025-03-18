const express = require("express");
const multer = require("multer");
const File = require("../models/File");

const router = express.Router();

// Multer Storage
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// Upload File
router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        const newFile = new File({
            name: req.file.filename,
            url: `http://localhost:5000/uploads/${req.file.filename}`
        });
        await newFile.save();
        res.json({ message: "File uploaded!", file: newFile });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get All Files
router.get("/", async (req, res) => {
    try {
        const files = await File.find();
        res.json(files);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
