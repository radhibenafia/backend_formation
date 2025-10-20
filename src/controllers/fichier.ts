import { Request, Response } from "express";
import FileModel, { IFile } from "../models/fichier";
import fs from "fs";

// 🔹 Étendre l'interface Request pour inclure file (géré par Multer)
interface MulterRequest extends Request {
    file?: Express.Multer.File; // Ajout de la propriété file
}

// Interface pour le corps de la requête
interface IFileRequest {
    title: string;
    nom: string;
    prenom: string;
}

// Fonction pour l'upload de fichiers
export const uploadFile = async (req: MulterRequest, res: Response): Promise<void> => {
    try {
        const { title, nom, prenom } = req.body;

        // 🔹 Vérification si un fichier est bien reçu
        if (!req.file) {
            res.status(400).json({ error: "Aucun fichier reçu" });
            return;
        }

        // Lecture du contenu du fichier
        const fileContent = fs.readFileSync(req.file.path, "utf8");
        const creator = `${nom} ${prenom}`; // Concaténation du nom et prénom

        // Création de l'objet à enregistrer dans la base
        const newFile: IFile = new FileModel({
            title,
            creator,
            content: fileContent,
        });

        // Sauvegarde en base de données
        await newFile.save();
        fs.unlinkSync(req.file.path); // Suppression du fichier temporaire

        res.status(201).json({ message: "Fichier uploadé avec succès", file: newFile });
    } catch (error) {
        console.error("Erreur lors de l'upload :", error);
        res.status(500).json({ error: "Erreur lors de l'upload du fichier", details: error });
    }
};
export const getAllFiles = async (req: Request, res: Response): Promise<void> => {
    try {
        // 🔹 Récupérer tous les fichiers dans la base de données
        const files: IFile[] = await FileModel.find();

        // 🔹 Vérification si des fichiers existent
        if (files.length === 0) {
            res.status(404).json({ message: "Aucun fichier trouvé" });
            return;
        }

        // 🔹 Renvoyer les fichiers trouvés
        res.status(200).json({ files });
    } catch (error) {
        console.error("Erreur lors de la récupération des fichiers :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des fichiers", details: error });
    }
};
