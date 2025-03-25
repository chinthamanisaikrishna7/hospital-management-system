const Patient = require ("../models/patient");
// const user = require ("../models/Users");

exports.createpatient = async (req, res) => {
    try {
        console.log("Request Body:", req.body);  // Debugging Step
        const userId = req.user.userId;
       
        if (!userId) {
          return res.status(400).json({ error: "Username is required" });
      }
      const {name, age, gender, contactNumber, email, address, bloodGroup, disease } = req.body;
        const newpatient = new Patient({ userId, name, age, gender, contactNumber, email, address, bloodGroup, disease });
        await newpatient.save();
        
        res.status(201).json(newpatient);
    } catch (err) {
        console.log("Error:", err);  // Debugging Step
        res.status(500).json({ error: err.message });
    }
};

  
  exports.getAllpatients = async (req, res) => {
    try {
      const patients = await Patient.find();
      res.json(patients);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // exports.getpatientById = async (req, res) => {
  //   try {
  //     const patient = await Patient.findById(req.params.id);
  //     if (!patient) return res.status(404).json({ message: "patient not found" });
  //     res.json(patient);
  //   } catch (err) {
  //     res.status(500).json({ error: err.message });
  //   }
  // };
  exports.getpatientById = async (req, res) => {
    try {
        // const username = req.user.username;
        const userRole = req.user.role;
        const userId = req.user.userId;
        if (userRole === "patient") {
            const patient = await Patient.findOne({ userId });
            if (!patient) return res.status(404).json({ error: "Patient data not found" });
            return res.json(patient);
        }
        const patientId = req.params.id;
        if (!patientId) {
          return res.status(400).json({ error: "Patient ID is required" });
      }
        const patient = await Patient.findById(patientId);
        if (!patient) return res.status(404).json({ error: "Patient not found" });

        res.json(patient);
    } catch (e) {
      console.error("Login Error:", e);
      res.status(500).json({ error: "Error logging in", details: e.message });
  }
  
};

  
  exports.updatepatient = async (req, res) => {
    try {
      // const username = req.user.username;
      const userId = req.user.userId;
      const updatedpatient = await Patient.findOneAndUpdate({userId}, req.body, { new: true });
      res.json(updatedpatient);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.deletepatient = async (req, res) => {
    try {
      // const username = req.user.username; 
      const userId = req.user.userId;
      const deletedpatient = await Patient.findOneAndDelete({ userId });

      if (!deletedpatient) return res.status(404).json({ error: "Patient not found" });

      res.json({ message: "Patient deleted" });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
  };

 exports.personalinfo= async (req, res) => {
    try {
        const patient = await Patient.findOne({ userId: req.user.id }); // `req.user.id` comes from JWT
        if (!patient) {
            return res.status(404).json({ error: "Patient not found" });
        }
        res.json(patient);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
        res.status(500).json({ error: err.message });
    }
};
