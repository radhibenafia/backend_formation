import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbUrl: string = process.env.MONGODB_URL || 

export const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl);
        console.log("✅ Connected to MongoDB radi ");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
};
