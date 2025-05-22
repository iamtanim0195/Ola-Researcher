import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true }, // Firebase UID
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: String,
    role: { type: String, enum: ['student', 'professor'], required: true },
    // Student-specific fields
    researchInterests: [{ type: String }],
    ieltsScore: { type: Number },
    greStatus: { type: Boolean },
    contactInfo: { type: String },
    // Professor-specific fields
    scholarLink: { type: String },
    university: { type: String },
    // Requirements professors set for students
    minIeltsScore: { type: Number },
    requiresGRE: { type: Boolean }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);