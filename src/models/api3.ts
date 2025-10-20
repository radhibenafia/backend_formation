import mongoose from 'mongoose';

const api3Schema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // Champ id personnalisé
    nom: { type: String, required: true },
    prenom: { type: String, required: true }
});

// Création du modèle
const Api3 = mongoose.model('radhis', api3Schema);
export default Api3;
