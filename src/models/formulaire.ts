// models/AutismInsight.ts
import mongoose from "mongoose";

const AutismInsightSchema = new mongoose.Schema({
    doctorName: { type: String, required: true },
    experienceYears: { type: Number, required: true },
    specialty: { type: String, required: true },
    commonSymptoms: [String],
    ageOfDiagnosis: String,
    effectiveTherapies: String,
    communicationChallenges: String,
    socialBehavior: String,
    familySupportTips: String,
    frequentComorbidities: [String],
    personalObservations: String,
});

export default mongoose.model("formulaires", AutismInsightSchema);
