const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const patient_routes = require("./routes/patient_routes");
const authRoutes = require("./routes/authRoutes");
// const userRoutes = require("./routes/userRoutes");
const doctorRoutes = require("./routes/doctorRoutes");  
const appointmentRoutes = require("./routes/appointmentRoutes");  
const Patient=require("./models/patient");
const Doctor = require("./models/doctor");
const Appointment= require("./models/appointmentsentry");


// const doctorRoutes = require("./routes/doctorRoutes"); // Import doctor routes
 // Register doctor routes


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/patient", patient_routes);
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes); 
app.use("/api/appointments", appointmentRoutes);  
// app.use("/api/doctors", doctorRoutes);
// app.use("/users", userRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/test')
.then(()=>{
    console.log("MONGO IS CONNECTED");
})
.catch((err) => {
    console.log("OH NOO  MONGO CONNECTION ERROR");
    console.log(err);
});

app.listen(5000, () => console.log("Server running on port 5000"));
