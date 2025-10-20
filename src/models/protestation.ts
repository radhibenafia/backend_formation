


import mongoose from 'mongoose';

const api4Schema = new mongoose.Schema({
    protestation: { type: String, required: true },
    sender: { type: String, required: true }
});

// Création du modèle
const Api4 = mongoose.model('protestations', api4Schema);
export default Api4;

