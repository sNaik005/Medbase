import React, { useState } from "react";
// import './css/AddData.css'
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import {
  addHospitalNewRecord,
  fetchIndiPersonalDetails,
  uploadGenomeFile,
} from "../../../services/api";
import Noty from "noty";
import './css/HospitalPage.css'

const AddData = () => {
  const [details, setDetails] = useState({});
  const [disDate, setDisDate] = useState();
  const [adDate, setAdDate] = useState();
  const [file, setFile] = useState(null);

  const handleFetchDetails = async (e) => {
    const inputId = e.target.value;
    setDetails(await fetchIndiPersonalDetails(inputId));
    console.log(details);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleGenomeUpload = async (e) => {
    e.preventDefault();
    if (file) {
      // Here you can perform any file upload logic, such as sending the file to a server
      console.log("File uploaded:", file);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("personId", details.uniqueId);
      const response = await uploadGenomeFile(formData);
      console.log(response);
    } else {
      alert("Please select a file");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newData = {
      uniqueId: details.uniqueId,
      caseId: document.getElementById("caseId").value,
      admittedFor: document.getElementById("reason").value,
      dateAdmitted: adDate, // Assuming adDate is set from the DatePicker
      dateDischarged: disDate, // Assuming disDate is set from the DatePicker
      billingAmount: document.getElementById("bill").value,
      hospitalId: "H1001",
    };

    const response = await addHospitalNewRecord(newData);
    if (response.flag) {
      new Noty({
        type: "success",
        text: "New Record Added",
        timeout: 2000,
      }).show();
    }
  };

  return (
    <div>
      <h1 className="m-3">New Hospital Admit Record</h1>
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
                Admitted For
              </label>
              <input type="text" className="form-control" id="reason" />
            </div>
            <div className="col-md-3">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Date Admitted"
                    value={adDate}
                    onChange={(n) => setAdDate(n)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className="col-md-3">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Date Discharged"
                    value={disDate}
                    onChange={(n) => setDisDate(n)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className="col-md-3 ">
              <label for="inputCity" className="form-label">
                Billing Amount
              </label>
              <input
                type="text"
                placeholder="Rs."
                className="form-control "
                id="bill"
              />
            </div>
            <div className="col-md-3 ">
              <label for="inputCity" className="form-label">
                Hospital ID
              </label>
              <input
                type="text"
                className="form-control "
                id="inputCity"
                value={"H1001"}
                disabled
              />
            </div>
            <div className="col-12">
              <button
                type="submit"
                className="pageButton"
                onClick={handleSubmit}
                style={{width: "24vw", height: "4vw", fontSize:"1em"}}
              >
                Add New Admit Record
              </button>
            </div>
          </form>
         {!details.genomeFile? (<div class="d-flex flex-column input-group my-3">
            <h3>Genome Data</h3>
            <form onSubmit={handleGenomeUpload}>
              <div className="d-flex">
                <input
                  type="file"
                  className="form-control"
                  id="genomeFile"
                  onChange={handleFileChange}
                />
              </div>
              <button
                type="submit"
                
                className="pageButton"
                style={{width: "22vw", height: "4vw", fontSize:"1em"}}
              >
                Add Genome Data
              </button>
            </form>
          </div>):(<div className="d-flex"><i class=" fa-2x fa-solid fa-check" style={{color: "#63E6BE"}}></i><h3>Genome data exists</h3></div>)}
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
};

export default AddData;
