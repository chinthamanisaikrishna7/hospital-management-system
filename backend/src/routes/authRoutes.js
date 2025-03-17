const express = require ("express");
const bcrypt = require ("bcryptsjs");
const User = require ("../models/Users");

const router = express.Router();

router.post("/register", async (req,res) => {
    const {username,password,role} = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new  User({ username, password: hashedPassword, role });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    }
    catch(e){
        res.status(500).json({ error: "Error registering user" });
    }
})

module.exports=router;