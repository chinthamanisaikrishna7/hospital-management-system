const express = require("express");
// const Appointment = require("../models/appointmentsentry");
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const authMiddleware = require ("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { bookAppointment, getDoctorsBySpecialization } = require("../crud_operations/appointments");
const { createDoctor } = require("../crud_operations/doctor");


const router = express.Router();
// router.post("/bookAppointment",authMiddleware, roleMiddleware(["patient"]), bookAppointment);
// router.get("/doctors", authMiddleware, getDoctorsBySpecialization);
router.get("/",authMiddleware, getDoctorsBySpecialization);
router.post("/", createDoctor);
module.exports = router;
