const mongoose = require ("mongoose");

const PatientSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: false },
    address: { type: String, required: true },
    bloodGroup: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'], required: true },
    disease: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
});

const Patient = mongoose.model ("patient", PatientSchema);
module.exports=Patient;