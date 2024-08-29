import React, { useContext } from 'react';
import { fetchIndiVaccineRecords, fetchIndiClinicalRecords, fetchIndiTestsRecords, fetchIndiHospitalRecords, fetchIndiPersonalDetails } from '../../services/api';
import { RecordsContext } from '../context/RecordsProvider';
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

const IdInput = () => {
const navigate = useNavigate();
  const {setVaccineRecs,  setTestRecs,setHospitalRecs,setClinicRecs, setPersonal} =  useContext(RecordsContext);
  
  // const history = useHistory();
  const handleSubmit = async(event) => {
    event.preventDefault();
    const txtInp = event.target.elements.inputId.value;
    
    let vaccines = await fetchIndiVaccineRecords(txtInp);
    let hospital = await fetchIndiHospitalRecords(txtInp);
    let tests = await fetchIndiTestsRecords(txtInp);
    let clinical = await fetchIndiClinicalRecords(txtInp);
    let details = await fetchIndiPersonalDetails(txtInp);

    setVaccineRecs(vaccines);
    setClinicRecs(clinical)
    setHospitalRecs(hospital)
    setTestRecs(tests);
    setPersonal(details)
    navigate('/overview')
  };

  return (
    <div className='container md-5'>
      <form onSubmit={handleSubmit}>
        <div className="container my-5 md-5 mb-3" style={{ width: 800 }}>
        <h1 className='my-5'>Identification using Unique ID number</h1> 
          <label htmlFor="inputId" className="form-label">Unique Identification Number</label>
          <input
            type="text"
            className="form-control"
            id="inputId"
            name="inputId" // added name attribute for better accessibility
            
          />
          <div id="emailHelp" className="form-text">The one which is holding all your MEDICAL RECORDS</div>
          <button type="submit" className="btn btn-primary" style={{ marginLeft: "auto" }}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default IdInput;
