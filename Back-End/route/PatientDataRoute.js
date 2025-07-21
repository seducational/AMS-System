const express = require('express');
const router = express.Router();
const { addPatientData,getAllPatientData,getPatientCount,getInfectionStats,getComplianceStats,deletePatientData,updatePatientData } = require('../controller/PatientDataController');

router.post('/add', addPatientData);
router.get('/getPatient', getAllPatientData);
router.get('/count', getPatientCount);
router.get('/infection-stats', getInfectionStats);
router.get('/compliance-stats', getComplianceStats);

router.delete('/delete/:id', deletePatientData);
router.put('/update/:id', updatePatientData);
module.exports = router;