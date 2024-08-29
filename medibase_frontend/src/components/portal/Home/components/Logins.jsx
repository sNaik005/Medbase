import React from "react";
import "../css/Home.css";
import HospitalImage from "../../logins/HospitalLogin/hospital login.svg";
import UserImage from "../users.jpg";
import AdminImage from "../admin3.png";
import { Link, useNavigate } from "react-router-dom";
import sideImage from './back3.jpg';
import Reveal from "./Reveal";


const Logins = () => {
  

  return (
    <div className="d-flex">
  <div className="pageContainer" style={{height:"100vh", width: "30%", left:"0", backgroundColor: "#0093E9",
backgroundImage: "linear-gradient(39deg, #0093E9 27%, #80D0C7 100%)", borderRadius : "0px"
}}>
    <div className="d-flex flex-column align-items-center justify-content-center">
      <h1 className="text-uppercase " style={{ fontFamily: "'Varela Round', sans-serif", color:"black", textShadow: "1px 2px 10px  #fff", fontSize: "2em"}}>
        Logins
      </h1>
      <div className="homeContainer">
        <div className="d-flex flex-column align-items-center justify-content-around">
          <Link to={"/login/userLogin"}>
            <Reveal>
            <div className="left indiContainer" >
              <img
                src={UserImage}
                style={{ borderRadius: "18px", height: "250px", width: "320px" }}
                alt=""
              />
              <h2>User Login</h2>
            </div>
            </Reveal>
          </Link>
          <Link to={"/login/hospital"}>
           <Reveal>
           <div className="indiContainer right">
              <img
                src={HospitalImage}
                style={{ borderRadius: "18px", height: "70%", width: "60%" }}
                alt=""
              />
              <h2>Medical Organization Login</h2>
            </div>
           </Reveal>
          </Link>
        </div>
      </div>
    </div>
  </div>
  <div style={{width: "70%"}}>
    <img src={sideImage} style={{width: "100%", height: "100vh"}} alt="Side Image" />
  </div>
</div>

  );
};
export default Logins;
