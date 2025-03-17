const Patient = require ("../models/patient");

exports.createpatient = async (req, res) => {
    try {
        console.log("Request Body:", req.body);  // Debugging Step

        const { name, age, gender, contactNumber, email, address, bloodGroup, disease } = req.body;

        const newpatient = new Patient({ name, age, gender, contactNumber, email, address, bloodGroup, disease });
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
  
  exports.getpatientById = async (req, res) => {
    try {
      const patient = await Patient.findById(req.params.id);
      if (!patient) return res.status(404).json({ message: "patient not found" });
      res.json(patient);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.updatepatient = async (req, res) => {
    try {
      const updatedpatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedpatient);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.deletepatient = async (req, res) => {
    try {
      await Patient.findByIdAndDelete(req.params.id);
      res.json({ message: "Patient deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };