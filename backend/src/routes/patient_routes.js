const express = require("express");
const router = express.Router();
const { createpatient, getAllpatients, getpatientById, updatepatient, deletepatient } = require("../crud_operations/patient_crud");
const authMiddleware = require ("../middleware/authMiddleware");

router.post("/",authMiddleware, createpatient);
router.get("/",authMiddleware, getAllpatients);
router.get("/:id",authMiddleware, getpatientById);
router.put("/:id",authMiddleware, updatepatient);
router.delete("/:id",authMiddleware, deletepatient);

module.exports = router;
