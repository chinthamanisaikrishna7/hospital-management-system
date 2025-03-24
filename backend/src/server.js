const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const patient_routes = require("./routes/patient_routes");
const authRoutes = require("./routes/authRoutes");
// const userRoutes = require("./routes/userRoutes");




const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/patient", patient_routes);
app.use("/api/auth", authRoutes);
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
