const Doctor = require("../models/doctor");

// Create a new doctor
exports.createDoctor = async (req, res) => {
    try {
        console.log("Request Body:", req.body);  // Debugging Step

        const { name, email, specialization, fees } = req.body;

        if (!name || !email || !specialization || !fees) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({ error: "Doctor with this email already exists" });
        }

        const newDoctor = new Doctor({ name, email, specialization, fees });
        await newDoctor.save();

        res.status(201).json({ message: "Doctor added successfully", doctor: newDoctor });
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ error: err.message });
    }
};
