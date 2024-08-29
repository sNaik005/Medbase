import express from 'express';
const Route = express.Router();
import multer from "multer";
import { processFingerprint } from './controllers/processFingerprint.js';
import { fetchDetails, fetchIndiClinicalRecords, fetchIndiHospitalRecords, fetchIndiTestsRecords, fetchIndiVaccineRecords, getLatestSugarBPCholestrol } from './controllers/PersonDetails.js';
import { checkUserCredForOtp, orgLogin, sendResponseToClients, validateAppUser } from './controllers/login.js';
import { addClinicNewRecord, addHospitalNewRecord, heightWeightUpdate } from './controllers/AddData.js';
import { uploadGenomeFile } from './controllers/Files.js';



// setting up the bucket



const storage = multer.memoryStorage();
const upload = multer({storage: storage});

// const storage = multer.memoryStorage(); // Store the uploaded image in memory
// const upload = multer({ storage: storage });


// Route.post("/process-image",upload.single("image"),processFingerprint);
Route.post("/fetchDetails", fetchDetails);
Route.post("/fetchIndiVaccineRecords", fetchIndiVaccineRecords);
Route.post("/fetchIndiHospitalRecords", fetchIndiHospitalRecords)
Route.post("/fetchIndiTestsRecords", fetchIndiTestsRecords)
Route.post("/fetchIndiClinicalRecords", fetchIndiClinicalRecords)
Route.post("/orgLogin", orgLogin);
Route.post("/hospital/newRecord", addHospitalNewRecord);
Route.post('/clinic/newRecord', addClinicNewRecord);
Route.post('/personal/hwUpdate', heightWeightUpdate);
Route.post('/getLatestLevels', getLatestSugarBPCholestrol)
Route.post('/checkUserCredForOtp', checkUserCredForOtp)
Route.get('/subscribe', sendResponseToClients)
Route.post('/validateAppUser', validateAppUser)




export default Route;