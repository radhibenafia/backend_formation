import mongoose from 'mongoose';

const api2Schema = new mongoose.Schema({
    vendeur: String,
    acheteur: String,
    superficie: String,
    nomTerrain: String,
    description: String,
    lieu: String,
    prixPropose: String,
    typePaiement: String,
    _class: String,
});

const Api2 = mongoose.model('agricoles', api2Schema);
export default Api2;
