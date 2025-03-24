const express = require ("express");
const bcrypt = require ("bcryptjs");
const User = require ("../models/Users");
const jwt = require("jsonwebtoken");
const Patient = require("../models/patient");

const router = express.Router();

// router.post("/register", async (req,res) => {
//     const {username,password,role} = req.body;
//     try{
//         const hashedPassword = await bcrypt.hash(password,10);
//         const newUser = new  User({ username, password: hashedPassword, role });
//         await newUser.save();
//         res.status(201).json({ message: "User registered successfully!" });
//     }
//     catch(e){
//         res.status(500).json({ error: "Error registering user" });
//     }
// });

// router.post("/login", async (req,res)=>{
//     const {username,password} = req.body;
//     try{
//         const user = await User.findOne({username});
//         if(!user){
//             return res.status(400).json({error: "Invalid Credentials"});
//         }
//         else{
//             if (!user) {
//                 return res.status(400).json({ error: "Invalid Credentials" });
//               }
//             const isMatched = await bcrypt.compare(password,user.password);
//             if(!isMatched){
//                 return res.status(400).json({error: "Invalid Credentials"});
//             }
//             else{
//                 const token = jwt.sign(
//                     { userId: user._id, role: user.role },
//                     "yourSecretKey",
//                     { expiresIn: "30m" }
//                   );
              
//                   res.json({ token, role: user.role || "user" });
//             }
//         }
        
//     }
//     catch (e){
//         res.status(500).json({ error: "Error logging in" });
//     }
// });
// --------------------------------------------------------------------------------------
//THE MAIN ONE
// ------------------------------------------------------------------------------------------
// router.post("/register", async (req, res) => {
//     const { username, password, role } = req.body;
//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({ username, password: hashedPassword, role });
//         await newUser.save();

//         if (role === "patient") {
//             const newPatient = new Patient({ userId: newUser._id, name: username }); 
//             await newPatient.save();
//         }

//         res.status(201).json({ message: "User registered successfully!" });
//     } catch (e) {
//         res.status(500).json({ error: "Error registering user" });
//     }
// });
// --------------------------------------------------------------------------------------------------
// THE MAIN ONE COMPLETE
//-------------------------------------------------------------------------------------------------------
// FOR TESTING 1
// -----------------------------------------------------------------------------------------------------
// router.post("/register", async (req, res) => {
//     const { username, password, role } = req.body;
//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({ username, password: hashedPassword, role });

//         await newUser.save();
//         res.status(201).json({ message: "User registered successfully!" });
//     } catch (e) {
//         console.error("Error registering user:", e); // 👈 Add this line
//         res.status(500).json({ error: "Error registering user", details: e.message });
//     }
// });
// ------------------------------------------------------------------------------------------------------
// TESTING 1 COMPLETE
// -----------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------
// TESTING 2 IT LOGS EVERYTHING
// ----------------------------------------------------------------------------------------------------
// router.post("/register", async (req, res) => {
//     const { username, password, role } = req.body;
//     try {
//         console.log("Checking if user exists...");
//         const existingUser = await User.findOne({ username });

//         if (existingUser) {
//             console.log("Username already exists:", username);
//             return res.status(400).json({ error: "Username already exists. Please choose a different username." });
//         }

//         console.log(" Username is available, proceeding to register...");

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({ username, password: hashedPassword, role });

//         await newUser.save();
//         console.log(" User registered successfully:", username);
        
//         res.status(201).json({ message: "User registered successfully!" });
//     } catch (e) {
//         console.error(" Error registering user:", e);
//         res.status(500).json({ error: "Error registering user", details: e.message });
//     }
// });
// ------------------------------------------------------------------------------------------
// TESTING 2 COMPLETE - WORKING PERFECT
// ------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
// TESTING 3 REGISTER
// -------------------------------------------------------------------------------------
router.post("/register", async (req, res) => {
    const { username, password, role } = req.body;
    try {
        console.log("Checking if user exists...");
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            console.log("Username already exists:", username);
            return res.status(400).json({ error: "Username already exists. Please choose a different username." });
        }

        console.log(" Username is available, proceeding to register...");

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, role });

        await newUser.save();
        console.log(" User registered successfully:", username);
        if (role === "patient") {
            const { name, age, gender, contactNumber, email, address, bloodGroup, disease } = req.body;

            if (!name || !age || !gender || !contactNumber || !address || !bloodGroup) {
                return res.status(400).json({ error: "Missing required patient details!" });
            }

            const newPatient = new Patient({
                userId: newUser._id, // Linking User with Patient
                name,
                age,
                gender,
                contactNumber,
                email,
                address,
                bloodGroup,
                disease
            });

            await newPatient.save();
            console.log("Patient record created successfully.");
        }
        res.status(201).json({ message: "User registered successfully!" });
    } catch (e) {
        console.error(" Error registering user:", e);
        res.status(500).json({ error: "Error registering user", details: e.message });
    }
});
// ---------------------------------------------------------------------------------------------------
// TESTING 3 COMPLETE 
// ------------------------------------------------------------------------------------------------------
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            "yourSecretKey",
            { expiresIn: "30m" }
        );

        if (user.role === "patient") {
            // Fetch patient data
            const patient = await Patient.findOne({ userId: user._id });
            if (patient) {
                return res.json({ token, role: user.role, patient });
            } else {
                return res.json({ token, role: user.role, message: "No data available. Please complete registration." });
            }
        }

        res.json({ token, role: user.role });
    }catch (e) {
        console.error("Login Error:", e);
        res.status(500).json({ error: "Error logging in", details: e.message });
    }
    
});

module.exports=router;