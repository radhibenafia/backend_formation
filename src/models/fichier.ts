import mongoose, { Schema, Document } from "mongoose";

// Interface TypeScript pour définir la structure d'un fichier
export interface IFile extends Document {
    title: string;
    creator: string; // {nom} {prenom}
    content: string;
    uploadedAt: Date;
}

// Schéma Mongoose
const fileSchema = new Schema<IFile>({
    title: { type: String, required: true },
    creator: { type: String, required: true }, // Concaténation {nom} {prenom}
    content: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
});

// Export du modèle
export default mongoose.model<IFile>("fichiers", fileSchema);
