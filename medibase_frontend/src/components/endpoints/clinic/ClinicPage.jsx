import React, { useContext } from 'react'
import clinicSvg from './clinic.svg'
import { Link } from 'react-router-dom'

import Navbar from '../../portal/Navbar'
import { RecordsContext } from '../../context/RecordsProvider'

const ClinicPage = () => {
  const {clinicDetails} = useContext(RecordsContext);
  console.log(clinicDetails);
  return (
    
      <body style={{ height: "100vh" ,backgroundColor: 'lightseagreen' }}>
       <Navbar />
        <div className="container my-5">
        <div className="d-flex align-items-center justify-content-between pageContainer my-5" style={{flexDirection:"row"}}>
        <div className="d-flex flex-column ">
           <h1>{clinicDetails?.org.name}</h1>
           <h3>Clinic Id: {clinicDetails?.org.orgId}</h3>
          
         </div>
         <img src={clinicSvg} alt="" srcset="" style={{width:"20%", height:"20%"}}/>
        </div>
         <div className="d-flex justify-content-between">
           <div className="pageContainer">
             <h2>Data</h2>
             <Link to={"/clinicPage/addClinicData"}>
               <button className="pageButton">Add </button>
             </Link>
             <button className="pageButton">View</button>
           </div>
         </div>
       </div>
      </body>
     
  )
}

export default ClinicPage