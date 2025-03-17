const express = require ("express");
const bcrypt = require ("bcryptsjs");
const User = require ("../models/Users");
const jwt = require("jsonwebtoken");

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
});

router.post("/login", async (req,res)=>{
    const {username,password} = req.body;
    try{
        const user = await User.find({username});
        if(!user){
            return res.status(400).json({error: "Invalid Credentials"});
        }
        else{
            const isMatched = await bcrypt.compare(password,user.password);
            if(!isMatched){
                return res.status(400).json({error: "Invalid Credentials"});
            }
            else{
                const token = jwt.sign(
                    { userId: user._id, role: user.role },
                    "yourSecretKey",
                    { expiresIn: "1h" }
                  );
              
                  res.json({ token, role: user.role });
            }
        }
        
    }
    catch (e){
        res.status(500).json({ error: "Error logging in" });
    }
});

module.exports=router;