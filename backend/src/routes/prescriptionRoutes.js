const express = require("express");
const { createPrescription, getPrescriptionsByPatient, getPrescriptionsByDoctor } = require("../crud_operations/prescription_crud");
const authMiddleware = require ("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const router = express.Router();

router.post("/", createPrescription);
router.get("/patient/:patientId", authMiddleware, roleMiddleware(["patient"]), getPrescriptionsByPatient);
router.get("/doctor/:doctorId", getPrescriptionsByDoctor);

module.exports = router;
