const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true, unique: true }, // Linking Doctor to User
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  specialization: { type: String, required: true }, // Added Specialization
  fees: { type: Number, required: true },
  // username: { type: String, required: true, unique: true },
  // password: { type: String, required: true }, // Hash this in production
});

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
