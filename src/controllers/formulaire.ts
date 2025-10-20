import { Request, Response } from "express";
import AutismInsight from "../models/formulaire";

export const createInsight = async (req: Request, res: Response) => {
    try {
        const insight = new AutismInsight(req.body);
        await insight.save();
        res.status(201).json(insight);
    } catch (error) {
        res.status(400).json({ error: "Échec de la création", details: error });
    }
};

export const getInsights = async (_req: Request, res: Response) => {
    try {
        const insights = await AutismInsight.find();
        res.json(insights);
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur", details: error });
    }
};
