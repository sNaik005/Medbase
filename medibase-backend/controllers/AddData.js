import HospitalAdmitRecord from "../models/HospitalAdmitRecords.js";
import ClinicalRecord from "../models/ClinicalRecords.js";
import Person from "../models/Person.js";

export const addHospitalNewRecord = async(req,res)=>{
   
    const {uniqueId,caseId ,admittedFor, dateAdmitted, dateDischarged, billingAmount,  hospitalId} = req.body.newData;
   
   
try {
    const hospitalRecord = new HospitalAdmitRecord({
        patientId: uniqueId, CaseID: caseId, AdmissionDate: dateAdmitted, DischargeDate: dateDischarged, BillingDetails: billingAmount, AdmittedFor: admittedFor, HospitalID: hospitalId
    });

    const addedRecord = await hospitalRecord.save();
   
    if(addedRecord){
    
        return res.status(200).json({flag: true, message: "added new hospital record"});
    }
    else{
        return res.status(500).send("Something went wrrong")
    }
} catch (error) {
    console.log(error);
    return res.status(500).send(error)
}
}

export const addClinicNewRecord = async(req, res)=>{
   try {
    const { uniqueId,
        caseId,
        diagnosis ,
        dateOfVisit ,
        doctorName, prescription,  tests, clinicId
    } = req.body;


    const parsedPresc =  JSON.parse(prescription);
   const  parsedTests =  JSON.parse(tests);

    const newRecord = new ClinicalRecord({
        patientId: uniqueId,
        DateOfVisit: dateOfVisit,
        DoctorName: doctorName,
        Diagnosis: diagnosis,
        Prescription: parsedPresc, 
        TestSuggested: parsedTests,
        CaseID: caseId,
        ClinicID:clinicId
    });

    const addedRecord = await newRecord.save();
    if(addedRecord){
    
        return res.status(200).json({flag: true, message: "added new clinic record"});
    }
    else{
        return res.status(500).send("Something went wrrong")
    }

   } catch (error) {
    console.log(error);
    return res.status(500).send(error);
   }
}

export const heightWeightUpdate = async(req, res)=>{
    try {
        const {uniqueId, height , weight} = req.body;

        const person = await Person.findOne({uniqueId : uniqueId});

        if (!person) {
            return res.status(404).json({ message: "Person not found" });
        }

        person.height = height;
        person.weight = weight;

        const updatedRec = await person.save();
        if(updatedRec){
    
            return res.status(200).json({flag: true, message: "Height Weight updated"});
        }
        else{
            return res.status(500).send("Something went wrrong")
        }



    } catch (error) {
        
    }
}