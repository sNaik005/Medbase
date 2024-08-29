import axios from "axios";

// export const URL = "http://localhost:6001";
export const URL = "http://13.234.239.242:6001";


export const processFingeprintImage = async(image) =>{
    try {
        let response = await axios.post(`http://localhost:6001/process-fingerprint-image`, image);
        console.log("api");
        return response.data;
    } catch (error) {
        
    }
}

export const processIrisImage = async(image) =>{
    try {
        let response = await axios.post(`http://localhost:6001/process-iris-image`, image);
        console.log("api");
        return response.data;
    } catch (error) {
        
    }
}

export const fetchFingeprintDetails = async(matchedImageName) => {
    try {
        console.log(matchedImageName);
        let details = await axios.post(`${URL}/fetchFingeprintDetails`,{ matchedImageName});
        console.log(details);
        return details.data;
    } catch (error) {
        console.log(error.message);
    }
}

export const fetchIrisDetails = async(matchedImageName) => {
    try {
        console.log(matchedImageName);
        let details = await axios.post(`${URL}/fetchFingeprintDetails`,{ matchedImageName});
        console.log(details); 
        return details.data;
    } catch (error) {
        console.log(error.message);
    }
}

// medical records   bb 

export const fetchIndiClinicalRecords = async(uniqueId) =>{
    try {
        let records = await axios.post(`${URL}/fetchIndiClinicalRecords`, {uniqueId});
        return records.data;
    } catch (error) {
        
    }
} 
export const fetchIndiHospitalRecords = async(uniqueId) =>{
    try {
        let records = await axios.post(`${URL}/fetchIndiHospitalRecords`, {uniqueId});
        return records.data;
    } catch (error) {
        
    }
} 
export const fetchIndiTestsRecords = async(uniqueId) =>{
    try {
        let records = await axios.post(`${URL}/fetchIndiTestsRecords`, {uniqueId});
        return records.data;
    } catch (error) {
        
    }
} 
export const fetchIndiVaccineRecords = async(uniqueId) =>{
    try {
        let records = await axios.post(`${URL}/fetchIndiVaccineRecords`, {uniqueId});
        return records.data;
    } catch (error) {
        
    }
} 

export const fetchIndiPersonalDetails = async(uniqueId) =>{
    try {
        
        let records = await axios.post(`${URL}/fetchDetails`, {uniqueId}); //
        return records.data;
    } catch (error) {
        
    }
} 

export const orgLogin = async(orgDetails) =>{
    try {
        let response = await axios.post(`${URL}/orgLogin`, {orgDetails});
        return response.data;
    } catch (error) {
        
    }
}

export const addHospitalNewRecord = async(newData) => {
    try {
        let response = await axios.post(`${URL}/hospital/newRecord`, {newData});
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const uploadGenomeFile = async(idAndFile)=>{
    try {
        let response = await axios.post(`${URL}/uploadGenomeFile`, idAndFile);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const addClinicNewRecord = async(clinicRecord) =>{
    try {
        let response = await axios.post(`${URL}/clinic/newRecord`, clinicRecord);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const updateHeightWeight = async(hwUpdate) => {
    try {
        let response = await axios.post(`${URL}/personal/hwUpdate`, hwUpdate);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getBpSugarChol = async(patientId) =>{
    try {
        let response = await axios.post(`${URL}/getLatestLevels`, patientId);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const checkUserCredForOtp = async(creds) =>{
    try {
        let response = await axios.post(`${URL}/checkUserCredForOtp`, creds);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
