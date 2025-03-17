const express = require("express");
const router = express.Router();
const { createpatient, getAllpatients, getpatientById, updatepatient, deletepatient } = require("../crud_operations/patient_crud");

router.post("/", createpatient);
router.get("/", getAllpatients);
router.get("/:id", getpatientById);
router.put("/:id", updatepatient);
router.delete("/:id", deletepatient);

module.exports = router;
