const data = require('../model/PatientDataModel');

// Add patient data
exports.addPatientData = async (req, res) => {
    try {
        const patientData = new data(req.body);
        await patientData.save();
        res.status(201).json({ message: 'Patient data added successfully', patientData });
    } catch (error) {
        console.error('Error adding patient data:', error);
        res.status(500).json({ message: 'Failed to add patient data', error: error.message });
    }
};

exports.getAllPatientData = async (req, res) => {
    try {
      const patients = await data.find().sort({ createdAt: -1 }); // latest first
      res.status(200).json(patients);
    } catch (error) {
      console.error("Error fetching patient data:", error);
      res.status(500).json({ message: "Failed to fetch patient data" });
    }
  };

  exports.getPatientCount = async (req, res) => {
    try {
      const count = await data.countDocuments();
      res.status(200).json({ totalPatients: count });
    } catch (error) {
      console.error("Error getting patient count:", error);
      res.status(500).json({ message: "Failed to get patient count" });
    }
  };
  