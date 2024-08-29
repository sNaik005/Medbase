import mongoose from 'mongoose';

// Define a schema
const hospitalAdmitRecordsSchema = new mongoose.Schema({
    patientId: {
        type: String,
        required: true
    },
    CaseID: {
        type: Number,
        required: true
    },
    AdmissionDate: {
        type: Date,
        required: true
    },
    DischargeDate: {
        type: Date,
        required: true
    },
    BillingDetails: {
        type: String,
        required: true
    },
    InsuranceInfo: {
        type: [{
            company: String,
            id: String,
            cover_amount: String
        }],
        default: []
    },
    AdmittedFor: {
        type: String,
        required: true
    },
    HospitalID : {
        type: String,
        required : true
    }
});

// Create a model
const HospitalAdmitRecord = mongoose.model('HospitalAdmitRecord', hospitalAdmitRecordsSchema);

export default HospitalAdmitRecord;
