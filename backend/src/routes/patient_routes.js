const express = require("express");
const router = express.Router();
const { createpatient, getAllpatients, getpatientById, updatepatient, deletepatient } = require("../crud_operations/patient_crud");
const authMiddleware = require ("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/",authMiddleware, roleMiddleware("doctor", "admin"), createpatient);
router.get("/",authMiddleware,roleMiddleware("doctor", "admin"), getAllpatients);
router.get("/:id",authMiddleware, getpatientById);
router.put("/:id",authMiddleware,roleMiddleware("doctor", "admin"), updatepatient);
router.delete("/:id",authMiddleware,roleMiddleware("admin"), deletepatient);

module.exports = router;
