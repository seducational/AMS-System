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

exports.getInfectionStats = async (req, res) => {
  try {
    const { from, to } = req.query;

    const fromDate = from ? new Date(from) : new Date('2000-01-01');
    const toDate = to ? new Date(to) : new Date();

    const result = await data.aggregate([
      {
        $match: {
          infectionType: { $in: ["MDRO", "VRE", "MRSA"] },
          Started_Date: { $gte: fromDate, $lte: toDate }
        }
      },
      {
        $group: {
          _id: "$infectionType",
          count: { $sum: 1 }
        }
      }
    ]);

    // Format to return all 3 types even if count is 0
    const formatted = {
      MDRO: 0,
      VRE: 0,
      MRSA: 0,
    };
    result.forEach(r => {
      formatted[r._id] = r.count;
    });

    res.json(formatted);
  } catch (err) {
    console.error("Error in getInfectionStats:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getComplianceStats = async (req, res) => {
  try {
    const { from, to } = req.query;

    // Convert string dates to Date objects
    const fromDate = from ? new Date(from) : new Date('2000-01-01');
    const toDate = to ? new Date(to) : new Date();

    // Filter based on Started_Date range
    const filter = {
      Started_Date: { $gte: fromDate, $lte: toDate }
    };

    const total = await data.countDocuments(filter);

    if (total === 0) {
      return res.json({
        reservePolicy: 0,
        empiricalTherapy: 0,
        deEscalation: 0
      });
    }

    const reserveCount = await data.countDocuments({ ...filter, Reserve_drug_policy_followed: "Yes" });
    const empiricalCount = await data.countDocuments({ ...filter, Empirical_Therapy: "Yes" });
    const deEscalationCount = await data.countDocuments({ ...filter, De_escalation: "Yes" });

    res.json({
      reservePolicy: ((reserveCount / total) * 100).toFixed(2),
      empiricalTherapy: ((empiricalCount / total) * 100).toFixed(2),
      deEscalation: ((deEscalationCount / total) * 100).toFixed(2)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching compliance metrics' });
  }
};
