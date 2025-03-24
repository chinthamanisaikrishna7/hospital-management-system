const express = require("express");
const router = express.Router();
const { createpatient, getAllpatients, getpatientById, updatepatient, deletepatient } = require("../crud_operations/patient_crud");
const authMiddleware = require ("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// router.post("/",authMiddleware, roleMiddleware(["admin", "doctor"]), createpatient);
// router.get("/",authMiddleware, roleMiddleware(["admin", "doctor"]), getAllpatients);
// router.get("/:id",authMiddleware, roleMiddleware(["admin", "doctor"]), getpatientById);
// router.put("/:id",authMiddleware,roleMiddleware(["admin", "doctor"]), updatepatient);
// router.delete("/:id",authMiddleware,roleMiddleware(["admin"]), deletepatient);

router.post("/",authMiddleware, roleMiddleware(["admin", "doctor"]), createpatient);
router.get("/getallpatients", authMiddleware, roleMiddleware(["admin", "doctor","receptionist"]), getAllpatients);
router.get("/:id", authMiddleware, roleMiddleware(["admin", "doctor","receptionist","patient"]), getpatientById);
router.put("/:id", authMiddleware, roleMiddleware(["admin", "doctor"]),  updatepatient);
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deletepatient  );

module.exports = router;
