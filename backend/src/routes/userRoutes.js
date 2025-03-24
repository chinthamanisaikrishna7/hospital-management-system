// const express = require("express");
// const router = express.Router();
// const User = require("../models/Users");
// const authMiddleware = require("../middleware/authMiddleware");
// const roleMiddleware = require("../middleware/roleMiddleware");

// router.get("/", authMiddleware, roleMiddleware(["admin"]), async (req, res) => {
//     try {
//         const users = await User.find();
//         res.json(users);
//     } catch (err) {
//         res.status(500).json({ error: "Error fetching users" });
//     }
// });

// module.exports = router;
