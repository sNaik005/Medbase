import mongoose from 'mongoose';

// Define a schema
const testsRecordsSchema = new mongoose.Schema({
    patientId: {
        type: String,
        required: true
    },
    TestType: {
        type: String,
        required: true
    },
    AnalysisDate: {
        type: Date,
        required: true
    },
    BloodPressure: {
        type: String
    },
    CholesterolLevels: {
        type: String
    },
    SugarLevels: {
        type: String
    },
    OtherClinicalMetrics: {
        type: String
    }
});

// Create a model
const TestRecord = mongoose.model('TestRecord', testsRecordsSchema);

export default TestRecord;
