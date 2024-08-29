import mongoose from 'mongoose';

// Define a schema
const clinicalRecordsSchema = new mongoose.Schema({
    patientId: {
        type: String,
        required: true
    },
    DateOfVisit: {
        type: Date,
        required: true
    },
    DoctorName: {
        type: String,
        required: true
    },
    Diagnosis: {
        type: String,
        required: true
    },
    Prescription: {
        type: [String],
        default: []
    },
    TestSuggested: {
        type: [String],
        default: []
    },
    CaseID: {
        type: Number,
        required: true
    },
    ClinicID: {
        type: String,
        required : true
    }
});

// Create a model
const ClinicalRecord = mongoose.model('ClinicalRecord', clinicalRecordsSchema);

export default ClinicalRecord;
