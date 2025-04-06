const express = require("express");
const { bookAppointment, getPatientAppointments, getDoctorAppointments, updateAppointmentStatus, getAllAppointments } = require("../crud_operations/appointments");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const Appointment = require("../models/appointmentsentry");
const router = express.Router();

// ✅ 1. Route to book an appointment (Only "patient" can book)
router.post("/book", authMiddleware, roleMiddleware(["patient"]), bookAppointment);

// ✅ 2. Route to get appointments for a patient (Only "patient" can see their appointments)
router.get("/history", authMiddleware, roleMiddleware(["patient"]), getPatientAppointments);

// ✅ 3. Route to get appointments for a doctor (Only "doctor" can see their appointments)
router.get("/doctor/:id", authMiddleware, roleMiddleware(["doctor"]), getDoctorAppointments);

router.put("/update-status", authMiddleware, roleMiddleware(["receptionist"]), updateAppointmentStatus);
router.get("/all", authMiddleware, roleMiddleware(["receptionist"]), getAllAppointments);

router.put("/:appointmentId", authMiddleware, roleMiddleware(["doctor"]), async (req, res) => {
    try {
        console.log("🔄 Received Request to Update Status");
        const { appointmentId } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: "Status is required" });
        }

        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        appointment.status = status;
        await appointment.save();

        res.json({ message: "Appointment status updated successfully!", appointment });
    } catch (error) {
        console.error("Error updating appointment:", error);
        res.status(500).json({ message: "Server error" });
    }
});
module.exports = router;
