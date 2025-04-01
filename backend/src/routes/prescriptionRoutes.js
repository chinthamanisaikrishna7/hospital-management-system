const express = require("express");
const { createPrescription, getPrescriptionsByPatient, getPrescriptionsByDoctor } = require("../crud_operations/prescription_crud");

const router = express.Router();

router.post("/", createPrescription);
router.get("/patient/:patientId", getPrescriptionsByPatient);
router.get("/doctor/:doctorId", getPrescriptionsByDoctor);

module.exports = router;
