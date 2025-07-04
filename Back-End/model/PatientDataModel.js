//Model For Patient Data
const mongoose = require('mongoose');
const patientDataSchema = new mongoose.Schema({
    //First Page
    UHID: { type: String, required: true },
    Age: { type: Number },
    Sex: { type: String },
    Indication: { type: String },
    Diagnosis: { type: String },
    Past_History: { type: String },   //type channges boolean to string
    Co_morbidities: { type: String },
    Empirical_Therapy: { type: String },  //type channges boolean to string
    Antibiotic_name: { type: String },
    Dose: { type: String },
    Route: { type: String },
    Frequency: { type: String },
    Started_Date: { type: Date },
    End_Date: { type: Date },
    Duration: { type: String },
    Culture_sent_before_start: { type: Boolean },
    Specimen: { type: String },

    //Second Page
    Antibiotic_change_afer_culture: { type: String },          //Changed to String from Boolean
    Antibiotic_name1: { type: String },
    Dose1: { type: String },
    Route1: { type: String },
    Frequency1: { type: String },
    Antibiotic_review: { type: String },
    De_escalation: { type: String },          //Changed to String from Boolean
    Is_Antibiotic_reserved: { type: String },          //Changed to String from Boolean
    Reserve_drug_policy_followed: { type: String },          //Changed to String from Boolean
    Selection_as_per_policy: { type: String },          //Changed to String from Boolean
    Policy_compliance: { type: String },
    infectionType: {
        type: String,
        enum: ["MDRO", "VRE", "MRSA"],
    },
    Remarks: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('PatientData', patientDataSchema);