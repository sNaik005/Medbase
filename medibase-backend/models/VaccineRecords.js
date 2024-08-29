import mongoose from 'mongoose';

// Define a schema
const VaccineRecordsSchema = new mongoose.Schema({
    patientId: {
        type: String,
        required: true
    },
    VaccineType: {
        type: String,
        required: true
    },
    HospitalID: {
        type: String,
        required: true
    },
    DateAdministered: {
        type: String,
       
    },
    Location: {
        type: String,
       
    }
});

// Create a model
const VaccineRecord = mongoose.model("vaccinerecord", VaccineRecordsSchema);

export default VaccineRecord;
