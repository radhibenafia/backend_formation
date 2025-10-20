import { Request, Response } from 'express';
import Api3 from '../models/api3';
import jwt from "jsonwebtoken";
// Fonction pour récupérer toutes les entrées
export const getAllApi3 = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = await Api3.find();
        res.json(data);
    } catch (error) {
        console.error('Erreur récupération Api3:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

// Fonction pour ajouter une entrée
export const addApi3 = async (req: Request, res: Response): Promise<void> => {
    try {
        // Définir les valeurs par défaut
        const nom = "Rayen";
        const prenom = "Rayen";
        const id = "8";  // ID personnalisé

        // Créer une nouvelle entrée avec les valeurs définies
        const newEntry = new Api3({ id, nom, prenom });

        // Sauvegarder dans la base de données
        await newEntry.save();

        // Répondre avec succès
        res.status(201).json({ message: 'Ajout réussi', data: newEntry });
    } catch (error) {
        console.error('Erreur lors de l\'ajout:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

export const loginApi3 = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nom, prenom } = req.body;

        // Vérifier si nom et prénom sont fournis
        if (!nom || !prenom) {
            res.status(400).json({ error: "Nom et prénom requis" });
            return;
        }

        // Vérifier si l'utilisateur existe dans la base de données
        let user = await Api3.findOne({ nom, prenom });

        // Si l'utilisateur n'existe pas, créer un nouvel utilisateur
        if (!user) {
            user = new Api3({ nom, prenom });
            await user.save();
        }

        // Générer un token JWT avec l'_id de MongoDB (plutôt que `user.id`)
        const token = jwt.sign(
            { id: user._id, nom: user.nom, prenom: user.prenom },  // Utilisation de _id au lieu de id
            "SECRET_KEY",
            { expiresIn: "1h" }
        );

        // Répondre avec un message et le token
        res.json({ message: "Connexion réussie", token, user });
    } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
};

