import React, { useState } from "react";
// import './css/AddData.css'
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import {
  
    addClinicNewRecord,
    fetchIndiPersonalDetails,
    updateHeightWeight,
    
  } from "../../../services/api";

const AddClinicData = () => {
    const [details, setDetails] = useState({});
    const [adDate, setAdDate] = useState();
    // const [additionalFields, setAdditionalFields] = useState([]);
    const [prescription, setPrescription] = useState([]);
    const [tests, setTests] = useState([]);
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');


    const handleFetchDetails = async(e) => {
        const inputId = e.target.value;
        
        let hwDetails = await fetchIndiPersonalDetails(inputId)
        
        setDetails(hwDetails);
        setHeight(details.height)
        setWeight(details.weight)
        console.log(details);
      };

const handleHeightChange = (e) =>{
    setHeight(e.target.value);
}
const handleWeightChange = (e) =>{
    setWeight(e.target.value);
}

//for tests
      const handleAddTests = () => {
        setTests([...tests, ""]);
      };
      const handleRemoveTests = (index) => {
        const newFields = [...tests];
        newFields.splice(index, 1);
        setTests(newFields);
      };

      const handleAdditionalTestsFieldChange = (index, value) => {
        const newFields = [...tests];
        newFields[index] = value;
        setTests(newFields);
      };

    //   for precription
      const handleAddPrescription = () => {
        setPrescription([...prescription, ""]);
      };
      const handleRemovePrescription = (index) => {
        const newFields = [...prescription];
        newFields.splice(index, 1);
        setPrescription(newFields);
      };

      const handleAdditionalPrescriptionFieldChange = (index, value) => {
        const newFields = [...prescription];
        newFields[index] = value;
        setPrescription(newFields);
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        const clinicRecord = {
          uniqueId: details.uniqueId,
          caseId : document.getElementById('caseId').value,
          diagnosis: document.getElementById("diagnosis").value,
          dateOfVisit : adDate,
          doctorName : document.getElementById('drName').value,
          prescription : JSON.stringify(prescription),
          tests : JSON.stringify(tests),
          clinicId : document.getElementById('clinicID').value
        };


         const hwUpdate = {
            uniqueId : details.uniqueId,
            height : height,
            weight : weight
        };

        const clincResponse = await addClinicNewRecord(clinicRecord);

        console.log(clincResponse);
        if(details?.height!=height || details?.weight!=weight){
            const hwResponse = await updateHeightWeight(hwUpdate);

            console.log(hwResponse);
        }
      }
    
  return (
    <div>
    <h1 className="m-3">New Clinic Visit Record</h1>
    <div className="d-flex">
      <div className="container flex-grow-1">
        <form className="row g-3">
          <div className="col-md-3">
            <label for="inputEmail4" className="form-label">
              Unique ID
            </label>
            <input
              type="text"
              className="form-control"
              id="inputEmail4"
              onBlur={handleFetchDetails}
            />
          </div>
          <div className="col-md-4">
            <label for="inputPassword4" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              disabled
              value={details?.name}
            />
          </div>
          <div className="col-md-3">
            <label for="inputCity" className="form-label">
              Aadhar
            </label>
            <input
              type="text"
              className="form-control"
              id="inputCity"
              disabled
              value={details?.aadhar}
            />
          </div>
          <div className="col-md-2">
            <label for="inputCity" className="form-label">
              DOB
            </label>
            <input
              type="text"
              className="form-control"
              id="inputCity"
              disabled
              value={details?.dob}
            />
          </div>
          <div className="col-12">
            <label for="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAddress"
              disabled
              value={details?.address}
            />
          </div>

          <div className="col-md-3">
            <label for="inputAddress2" className="form-label">
              Case ID
            </label>
            <input
              type="text"
              className="form-control"
              id="caseId"
              placeholder=""
            />
          </div>
          <div className="col-md-3">
            <label for="inputCity" className="form-label">
              Diagnosis
            </label>
            <input placeholder="Diagnosis/Reason" type="text" className="form-control" id="diagnosis" />
          </div>
          <div className="col-md-3">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Date of Visit"
                  value={adDate}
                  onChange={(n) => setAdDate(n)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          
          <div className="col-md-3 ">
            <label for="inputCity" className="form-label">
              Doctor Name
            </label>
            <input
              type="text"
              placeholder="Dr."
              className="form-control "
              id="drName"
            />
          </div>
          <div className="col-md-3 ">
            <label for="inputCity" className="form-label">
              Clinic ID
            </label>
            <input
              type="text"
              className="form-control "
              id="clinicID"
              value={"CL0001"}
              disabled
            />
          </div>
          <div className="col-md-3 ">
            <label for="inputCity" className="form-label">
              Height
            </label>
            <input
              type="text"
              className="form-control "
              id="height"
              value={height}
              onChange={handleHeightChange}
            />
          </div>
          <div className="col-md-3 ">
            <label for="inputCity" className="form-label">
              Weight
            </label>
            <input
              type="text"
              className="form-control "
              id="weight"
              value={weight}
              onChange={handleWeightChange}
              
            />
          </div>
         <div className="col-md-12">
            <h3>Suggested Tests</h3>
           <div className="d-flex">
           {tests.map((field, index) => (
              <div key={index} className=" col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={field}
                  onChange={(e) =>
                    handleAdditionalTestsFieldChange(index, e.target.value)
                  }
                />
                <button
                style={{margin: "5px 0"}}
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleRemoveTests(index)}
                >
                  <i class="fa-solid fa-minus"></i>
                </button>
              </div>
            ))}
           </div>
            <div className="col-md-1">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddTests}
              >
               <i class="fa-solid fa-plus"></i>
              </button>
            </div>
         </div>
         <div className="col-md-12">
            <h3>Prescription</h3>
           <div className="d-flex">
           {prescription.map((field, index) => (
              <div key={index} className=" col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Medicine"
                  value={field}
                  onChange={(e) =>
                    handleAdditionalPrescriptionFieldChange(index, e.target.value)
                  }
                />
                <button
                style={{margin: "5px 0"}}
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleRemovePrescription(index)}
                >
                  <i class="fa-solid fa-minus"></i>
                </button>
              </div>
            ))}
           </div>
            <div className="col-md-1">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddPrescription}
              >
               <i class="fa-solid fa-plus"></i>
              </button>
            </div>
         </div>
          <div className="col-12">
            <button
              type="submit"
              className="pageButton"
              onClick={handleSubmit}
              style={{width: "24vw", height: "4vw", fontSize:"1em"}}
            >
              Add New Visit Record
            </button>
          </div>
        </form>
       
      </div>
      <div className="flex-shrink-1">
        <div className=" card" style={{ height: "18rem", width: "18rem" }}>
          <img src={details?.photo} class="card-img-top" alt="Photo" />
          <div class="card-body"></div>
        </div>
      </div>
    </div>
  </div>
);
  
}

export default AddClinicData