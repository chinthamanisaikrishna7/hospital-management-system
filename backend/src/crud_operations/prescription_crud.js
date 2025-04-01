const Prescription = require("../models/prescription");
const Doctor = require("../models/doctor");
const Appointment = require("../models/appointmentsentry"); 

exports.createPrescription = async (req, res) => {
    try {
        const { patientId, doctorId, diseaseDescription, prescription } = req.body;

        // Fetch doctor details
        const doctor = await Doctor.findOne({ _id: doctorId });
        if (!doctor) return res.status(404).json({ error: "Doctor not found" });

        // Fetch latest appointment for the patient with this doctor
        const latestAppointment = await Appointment.findOne({ patientId, doctorId }).sort({ date: -1 });
        if (!latestAppointment) return res.status(404).json({ error: "No appointment found" });

        // Create prescription with doctor details & appointment date
        const newPrescription = new Prescription({
            patientId,
            doctorId,
            doctorName: doctor.name,
            doctorSpecialization: doctor.specialization,
            date: latestAppointment.date,
            diseaseDescription,
            prescription
        });

        await newPrescription.save();
        res.status(201).json({ message: "Prescription saved successfully", prescription: newPrescription });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getPrescriptionsByDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const prescriptions = await Prescription.find({ doctorId });
        res.status(200).json(prescriptions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getPrescriptionsByPatient = async (req, res) => {
    try {
        const { patientId } = req.params;
        const prescriptions = await Prescription.find({ patientId });
        res.status(200).json(prescriptions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
