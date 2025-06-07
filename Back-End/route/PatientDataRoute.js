const express = require('express');
const router = express.Router();
const { addPatientData,getAllPatientData,getPatientCount } = require('../controller/PatientDataController');

router.post('/add', addPatientData);
router.get('/getPatient', getAllPatientData);
router.get('/count', getPatientCount);
module.exports = router;