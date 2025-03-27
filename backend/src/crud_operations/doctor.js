// ----------------------------------------------------------------------------------
// THE START OF WORKING CODE
// --------------------------------------------------------------------------------------------
// const Doctor = require("../models/doctor");

// // Create a new doctor
// exports.createDoctor = async (req, res) => {
//     try {
//         console.log("Request Body:", req.body);  // Debugging Step

//         const { name, email, specialization, fees } = req.body;

//         if (!name || !email || !specialization || !fees) {
//             return res.status(400).json({ error: "All fields are required" });
//         }

//         const existingDoctor = await Doctor.findOne({ email });
//         if (existingDoctor) {
//             return res.status(400).json({ error: "Doctor with this email already exists" });
//         }

//         const newDoctor = new Doctor({ name, email, specialization, fees });
//         await newDoctor.save();

//         res.status(201).json({ message: "Doctor added successfully", doctor: newDoctor });
//     } catch (err) {
//         console.log("Error:", err);
//         res.status(500).json({ error: err.message });
//     }
// };
// -----------------------------------------------------------------------------------------------------
// THE END OF WORKING CODE
// ---------------------------------------------------------------------------------------------------
const Doctor = require("../models/doctor");
const User = require("../models/Users");

exports.createDoctor = async (req, res) => {
    try {
        console.log("Request Body:", req.body);  // Debugging Step

        const { userId, name, email, specialization, fees } = req.body;

        // Ensure all required fields are present
        if (!userId || !name || !email || !specialization || !fees) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if user exists and is a doctor
        const user = await User.findById(userId);
        if (!user || user.role !== "doctor") {
            return res.status(400).json({ error: "Invalid user or user is not a doctor" });
        }

        // Check if a doctor profile already exists for this user
        const existingDoctor = await Doctor.findOne({ userId });
        if (existingDoctor) {
            return res.status(400).json({ error: "Doctor profile already exists" });
        }

        // Create the doctor profile
        const newDoctor = new Doctor({ userId, name, email, specialization, fees });
        await newDoctor.save();

        res.status(201).json({ message: "Doctor added successfully", doctor: newDoctor });
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ error: err.message });
    }
};
