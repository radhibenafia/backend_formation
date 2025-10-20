import { Router } from 'express';
import { getAllApi3, addApi3, loginApi3 } from '../controllers/api3c';

const router = Router();

// Route pour ajouter un utilisateur
router.get('/add', addApi3);

// Route pour afficher tous les utilisateurs
router.get('/afficherAll3', getAllApi3);
router.post("/login", loginApi3);

export default router;
