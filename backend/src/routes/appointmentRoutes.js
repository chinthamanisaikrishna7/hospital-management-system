const express = require("express");
const { bookAppointment, getPatientAppointments, getDoctorAppointments } = require("../crud_operations/appointments");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// ✅ 1. Route to book an appointment (Only "patient" can book)
router.post("/book", authMiddleware, roleMiddleware(["patient"]), bookAppointment);

// ✅ 2. Route to get appointments for a patient (Only "patient" can see their appointments)
router.get("/patient/:id", authMiddleware, roleMiddleware(["patient"]), getPatientAppointments);

// ✅ 3. Route to get appointments for a doctor (Only "doctor" can see their appointments)
router.get("/doctor/:id", authMiddleware, roleMiddleware(["doctor"]), getDoctorAppointments);

module.exports = router;
