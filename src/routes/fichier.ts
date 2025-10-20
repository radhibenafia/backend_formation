import express from "express";
import multer from "multer";
import { uploadFile, getAllFiles } from "../controllers/fichier";

const router = express.Router();

// Configuration de Multer (stockage temporaire des fichiers)
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

// Route d'upload du fichier
router.post("/upload", upload.single("file"), uploadFile);
router.get("/files", getAllFiles);

export default router;
