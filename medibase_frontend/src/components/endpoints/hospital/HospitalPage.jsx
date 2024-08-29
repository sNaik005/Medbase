import React, { useContext } from "react";
import "./css/HospitalPage.css";
import { Link } from "react-router-dom";
import { RecordsContext }  from "../../context/RecordsProvider";
import Navbar from "../../portal/Navbar";
import hospSvg from './hospitalPage.svg'


const HospitalPage = () => {
const {hospDetails} = useContext(RecordsContext)
  return (
   <body style={{ height: "100vh" ,backgroundColor: "lightskyblue" }}>
    <Navbar />
   
     <div className="container my-5">
     <div className="d-flex align-items-center justify-content-between pageContainer my-5" style={{flexDirection:"row"}}>
     <div className="d-flex flex-column ">
        <h1>{hospDetails?.name}</h1>
        <h3>Hospital Id: {hospDetails?.orgId}</h3>
       
      </div>
      <img src={hospSvg} alt="" srcset="" style={{width:"20%", height:"20%"}}/>
     </div>
      <div className="d-flex justify-content-between">
        <div className="pageContainer">
          <h2>Data</h2>
          <Link to={"/hospitalPage/addData"}>
            <button className="pageButton">Add </button>
          </Link>
          <button className="pageButton">View</button>
        </div>
        <div className="pageContainer">
          <h2>Identify</h2>
          <Link to={"/biometricId"}>
            <button className="pageButton">Biometric </button>
          </Link>
          <Link to={"/idinput"}>
            <button className="pageButton">Unique ID</button>
          </Link>
        </div>
      </div>
    </div>
   </body>
  );
};

export default HospitalPage;
