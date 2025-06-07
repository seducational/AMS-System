const express = require('express');
const router = express.Router();
const { addPatientData } = require('../controller/PatientDataController');

router.post('/add', addPatientData);

module.exports = router;