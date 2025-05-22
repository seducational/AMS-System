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