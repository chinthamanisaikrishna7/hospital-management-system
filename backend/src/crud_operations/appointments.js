const Appointment = require("../models/appointmentsentry");
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const mongoose = require("mongoose");


exports.bookAppointment =  async (req, res) => {
  try {
    console.log("User in request:", req.user);
    const { doctorId, date, time } = req.body;
    // const patientId = req.user.id;
    // const patientId = req.user ? req.user.id : null;
    //const patientId = req.user?.id;
    const patient = await Patient.findOne({ userId: req.user.userId });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    const patientId = patient._id;
    console.log("✅ Extracted Patient ID:", patientId);
    if (!doctorId  || !date || !time) {
      return res.status(400).json({ message: "Missing required fields" });
  }
  console.log("✅ Patient ID extracted:", patientId);
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    // const patient = await Patient.findById(patientId);
    // if (!patient) return res.status(404).json({ message: "Patient not found" });


    console.log("Doctor Found:", doctor);
    console.log("Patient Found:", patient);

    const appointment = new Appointment({
      patientId,
      doctorId,
      date,
      time,
      fees: doctor.fees,
      status: "Pending",
    });
    const existingAppointment = await Appointment.findOne({
      doctorId: req.body.doctorId,
      date: req.body.date,
      time: req.body.time,
      status: { $in: ["Pending", "Booked"] } // Active appointments
    });
    
    if (existingAppointment) {
      return res.status(400).json({ message: "Doctor is not available at this time slot. Please choose another time." });
    }
    else{
      await appointment.save();
      res.status(201).json({ message: "Appointment booked successfully!" });
    }
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDoctorsBySpecialization = async (req, res) => {
  try {
    // const { specialization } = req.query;
    const specialization = req.query.specialization;

    if (!specialization) {
      return res.status(400).json({ message: "Specialization is required" });
    }

    const doctors = await Doctor.find({ specialization }).select("name fees");
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// ✅ 2. Get all appointments for a patient
exports.getPatientAppointments = async (req, res) => {
  try {
      // const patientId = req.params.id;
      // const patientId = req.user.userId;  
      console.log("🟢 JWT User ID:", req.user.userId);
      // const patientId = new mongoose.Types.ObjectId(req.user.userId);
      const patient = await Patient.findOne({ userId: req.user.userId });
      if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
    }
    console.log("✅ Extracted Patient ID:", patient._id);
      const appointments = await Appointment.find({ patientId: patient._id }).populate("doctorId", "name specialization");
      console.log("Fetched Appointments:", appointments);
      res.json(appointments);
  } catch (err) {
    console.error("Error fetching appointment history:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ 3. Get all appointments for a doctor
exports.getDoctorAppointments = async (req, res) => {
  try {
       const doctorId = req.params.id;
      // const { doctorId } = req.user;
      console.log("Loaded Mongoose Models:", mongoose.modelNames());

      if (!doctorId) {
        return res.status(400).json({ message: "Doctor ID is required" });
    }
      const appointments = await Appointment.find({ doctorId }).populate("patientId", "name age gender");

      res.json(appointments);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

// 👇 Add in appointments.js controller
exports.updateAppointmentStatus = async (req, res) => {
  const { appointmentId, status } = req.body;
  try {
    const updated = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );
    res.json({ message: "Appointment status updated", appointment: updated });
  } catch (err) {
    res.status(500).json({ message: "Error updating status" });
  }
};

// exports.getAllAppointments = async (req, res) => {
//   try {
//     const appointments = await Appointment.find()
//       .populate("patientId", "name age gender")
//       .populate("doctorId", "name specialization");
//     res.json(appointments);
//   } catch (err) {
//     console.error("Error fetching all appointments:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

exports.getAllAppointments = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const appointments = await Appointment.find(filter)
      .populate("patientId", "name age gender")
      .populate("doctorId", "name specialization");

    res.json(appointments);
  } catch (err) {
    console.error("Error fetching all appointments:", err);
    res.status(500).json({ message: "Server error" });
  }
};
