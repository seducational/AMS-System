const express = require('express');
const router = express.Router();
const { addPatientData,getAllPatientData,getPatientCount,getInfectionStats,getComplianceStats } = require('../controller/PatientDataController');

router.post('/add', addPatientData);
router.get('/getPatient', getAllPatientData);
router.get('/count', getPatientCount);
router.get('/infection-stats', getInfectionStats);
router.get('/compliance-stats', getComplianceStats);
module.exports = router;