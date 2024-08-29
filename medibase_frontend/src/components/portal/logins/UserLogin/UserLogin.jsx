import React, { useContext, useState, useRef, useEffect } from 'react';
import { checkUserCredForOtp } from '../../../../services/api';
import { useNavigate } from 'react-router-dom';
import { RecordsContext } from '../../../context/RecordsProvider';
import { fetchIndiVaccineRecords, fetchIndiClinicalRecords, fetchIndiTestsRecords, fetchIndiHospitalRecords, fetchIndiPersonalDetails } from '../../../../services/api'
import '../HospitalLogin/HospitalLogin.css'
import firebase from 'firebase/compat/app';
import { auth } from '../../../../services/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: "AIzaSyDtvC5L1Shb8YCK9L06pULuLuXxeDZUJvc",
//   authDomain: "human-medical-ecosystem.firebaseapp.com",
//   databaseURL: "https://human-medical-ecosystem-default-rtdb.firebaseio.com",
//   projectId: "human-medical-ecosystem",
//   storageBucket: "human-medical-ecosystem.appspot.com",
//   messagingSenderId: "729868141304",
//   appId: "1:729868141304:web:6c5ff8d9afc711d78b710d"
// };

// firebase.initializeApp(firebaseConfig);
// // Initialize Firebase



const UserLogin = () => {
    const [otpVisible, setOtpVisible] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const otpButtonRef = useRef(null);


//firebase otp code
const configureCaptcha = () =>{
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        onSignInSubmit();
        console.log("Recaptcha varified")
      },
      defaultCountry: "IN"
    });
  }


  const onSignInSubmit = (mobile) => {
    console.log(mobile);
    configureCaptcha();
    const phoneNumber = "+91" + mobile;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;
    
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            console.log("OTP has been sent");
        })
        .catch((error) => {
            console.error("Error sending OTP:", error);
            // Handle error, show user an appropriate message
        });
};

  const onSubmitOTP = (e) =>{
    e.preventDefault();
    const code = document.getElementById('otp').value;
    console.log(code)
    window.confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log(JSON.stringify(user))
      navigate('/overview')      
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      setErrorAlert(true);
      setTimeout(() => {
          setErrorAlert(false);
      }, 5000); 
    });
  }

    useEffect(() => {
        if (otpVisible) {
            // Trigger click event on the OTP button
            otpButtonRef.current.click();
        }
    }, [otpVisible]);

const navigate = useNavigate();

const {setVaccineRecs,  setTestRecs,setHospitalRecs,setClinicRecs, setPersonal} =  useContext(RecordsContext);


    const handleGetOtp = async (event) => {
        event.preventDefault();
        const creds = {
            uniqueId: document.getElementById('uniqueId').value,
            password: document.getElementById('password').value
        };
        console.log(creds.password);
        const response = await checkUserCredForOtp(creds);
        if (response?.flag) {
            handleSubmit();
            setOtpVisible(true);
            // Hide the success alert after 5 seconds
        } else {
            setErrorAlert(true);
            setTimeout(() => {
                setErrorAlert(false);
            }, 5000); // Hide the error alert after 5 seconds
        }
    };
    const handleSubmit = async()=>{
       
        const txtInp = document.getElementById('uniqueId').value;
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
        console.log("pahile " , details.mobile);
        onSignInSubmit(details.mobile)
       
    }

    useEffect(() => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');
    
        const handleSignUpClick = () => {
          container.classList.add("right-panel-active");
        };
    
        const handleSignInClick = () => {
          container.classList.remove("right-panel-active");
        };
    
        signUpButton.addEventListener('click', handleSignUpClick);
        signInButton.addEventListener('click', handleSignInClick);
    
        return () => {
          signUpButton.removeEventListener('click', handleSignUpClick);
          signInButton.removeEventListener('click', handleSignInClick);
        };
      }, []);
    

    return (
        <div className='d-flex flex-column align-items-center container my-5' >
             {errorAlert && (
                <div className="alert alert-danger" role="alert">
                    Invalid credentials! Please try again.
                </div>
            )}
            <div class="loginContainer" id="container">
            <div class="form-container sign-up-container">
            <form  className='loginForm' onSubmit={onSubmitOTP}>
                    
                    
                    <span></span>
                    <input className= "loginInput" type="text" placeholder="One Time Password" id='otp' />
                    
                    
                    <button type='submit'>Sign In</button>
                </form>
            </div>
            <div class="form-container sign-in-container">
                <form  className='loginForm' onSubmit={handleGetOtp}>
                    <h1>User Login</h1>
                    
                    <span></span>
                    <input className= "loginInput" type="text" placeholder="ID" id='uniqueId' />
                    <input className= "loginInput" type="password" placeholder="Password"  id = 'password' />
                    
                    <button type='submit'>Get Otp</button>
                </form>
            </div>
            <div class="overlay-container">
                <div class="overlay">
                    <div class="overlay-panel overlay-left">
                        <h1>OTP</h1>
                        <p>Enter the OTP received on registered Medibase moible number</p>
                        <button class="ghost" id="signIn" >Back</button>
                    </div>
                    <div class="overlay-panel overlay-right">
                    <h1>Login</h1>
                        <img   style={{borderRadius: "8px"}} alt="" srcset="" />
                        <p>Enter your uniqueId and password</p>
                        <button class="ghost" id="signUp"   ref={otpButtonRef} hidden>Clinic</button>
                    </div>
                </div>
            </div>
            <div id="sign-in-button"></div>
        </div>
        
        
         </div>
          )

    
};

export default UserLogin;

