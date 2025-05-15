// models/Faculty.js
import mongoose from 'mongoose';

const FacultySchema = new mongoose.Schema({
  universityName: String,
  department: String,
  languageProficiency: String,
  greScore: String,
  facultyName: String,
  scholarLink: String,
  fieldOfInterest: String,
  jobExperience: String,
});

// Explicitly map to the "ProfData" collection
export default mongoose.models.Faculty || mongoose.model('Faculty', FacultySchema, 'ProfData');
