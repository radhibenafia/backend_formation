import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from "./config/database";

import api2Routes from './routes/api2r';
import api3Routes from './routes/api3r';
import protestRoutes from './routes/Protestation';
import fichierRoutes from "./routes/fichier";
import insightRoutes from "./routes/formulaire";
import { notFound, errorHandler } from './middleware/errorhandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
connectDB();

// Routes
app.use('/appi', api3Routes);
app.use('/api', api2Routes);
app.use('/app', protestRoutes);
app.use("/ati/files", fichierRoutes);

app.use("/insights", insightRoutes);


// Middleware 404 et gestion des erreurs
app.use(notFound);
app.use(errorHandler);

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`🚀 Server   ${PORT}`);
});
