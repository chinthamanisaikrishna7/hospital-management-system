const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "patient", required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  fees: { type: Number, required: true },
  status: { type: String, enum: ["Pending", "Booked", "Completed", "Cancelled"], default: "Pending" },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
