import { Request, Response } from "express";
import Protestation from "../models/protestation";

// Interface pour typer le corps de la requête
interface IProtestationRequest {
    protestation: string;
    sender: string;
}

// Ajouter une protestation
export const addProtestation = async (req: Request<{}, {}, IProtestationRequest>, res: Response): Promise<void> => {
    try {
        const { protestation, sender } = req.body;

        // Vérification des données
        if (!protestation || !sender) {
            res.status(400).json({ message: "Tous les champs sont requis" });
            return;
        }

        // Création et sauvegarde dans la base
        const newProtestation = new Protestation({ protestation, sender });
        await newProtestation.save();

        res.status(201).json({ message: "Protestation ajoutée avec succès", protestation: newProtestation });
    } catch (error) {
        console.error("Erreur lors de l'ajout :", error);
        res.status(500).json({ message: "Erreur serveur", error });
    }
};
export const getUserProtestations = async (req: Request, res: Response): Promise<void> => {
    try {
        const sender = req.params.sender;

        if (!sender) {
            res.status(400).json({ message: "Sender est requis" });
            return;
        }

        const protestations = await Protestation.find({ sender });

        res.status(200).json(protestations);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

