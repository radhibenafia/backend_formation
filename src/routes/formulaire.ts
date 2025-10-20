import express from "express";
import { createInsight, getInsights } from "../controllers/formulaire";

const router = express.Router();

router.post("/doctoradd", createInsight);
router.get("/doctorall", getInsights);

export default router;
