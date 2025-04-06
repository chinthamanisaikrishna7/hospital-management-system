const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    doctorName: { type: String, required: true },
    doctorSpecialization: { type: String, required: true },
    date: { type: Date, required: true },  // Appointment date
    diseaseDescription: { type: String, required: true },
    prescription: { type: String, required: true }
});

const Prescription = mongoose.model("Prescription", prescriptionSchema);
module.exports = Prescription;
