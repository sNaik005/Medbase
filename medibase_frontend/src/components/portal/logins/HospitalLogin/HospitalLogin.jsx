import React, { useEffect, useContext, useState } from 'react'
import './HospitalLogin.css'
import HospitalImage from './hospital login.svg'
import { orgLogin } from '../../../../services/api'
import { useNavigate } from 'react-router-dom'
import { RecordsContext } from '../../../context/RecordsProvider'
import { URL } from '../../../../services/api'
import backgroundImage from './hospLoginBack.jpg'


const HospitalLogin = () => {
const navigate = useNavigate();
const [qrCodeUrl, setQRCodeUrl] = useState('');

const{setHospDetails, setClinicDetails, setCurrOrgUser} = useContext(RecordsContext);



	const handleHospitalSubmit = async(e)=>{
		e.preventDefault();

		let response = await orgLogin(JSON.stringify({orgId:document.getElementById('orgId').value, password : document.getElementById('orgPass').value}));
		// console.log(response);
		if(response){
			
			setQRCodeUrl(response.url);
			setHospDetails(response.org);
			
		}

		
	}

	const eventSource = new EventSource(`${URL}/subscribe`);

	eventSource.onmessage = (event)=>{
		event.preventDefault();
		const data = JSON.parse(event.data);
		
		if(data){
			setCurrOrgUser(data.username)
			navigate('/hospitalPage');
		}
	}

	const handleCliniclSubmit = async(e)=>{
		e.preventDefault();

		let orgDetails = await orgLogin(JSON.stringify({orgId:document.getElementById('CorgId').value, password : document.getElementById('CorgPass').value}));
		console.log(orgDetails);
		if(orgDetails){
			setClinicDetails(orgDetails)
			navigate('/clinicPage');
		}
		
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
	
		
<div className='d-flex flex-column align-items-center  py-5 mainContainer'  >
     
    <div class="loginContainer" id="container">
	<div class="form-container sign-up-container">
	<form  className='loginForm' onSubmit={handleCliniclSubmit}>
			<h1>Login</h1>
			
			<span></span>
			<input className= "loginInput" type="text" placeholder="ID" id='CorgId' />
			<input className= "loginInput" type="password" placeholder="Password"  id = 'CorgPass' />
			
			<button type='submit'>Clinic Sign In</button>
		</form>
	</div>
	<div class="form-container sign-in-container">
		{qrCodeUrl?<img style={{margin: "100px 100px", height: "200px", width: "200px" }} src={qrCodeUrl} alt="QR Code" />:<form  className='loginForm' onSubmit={handleHospitalSubmit}>
			<h1>Login</h1>
			
			<span></span>
			<input className= "loginInput" type="text" placeholder="ID" id='orgId' />
			<input className= "loginInput" type="password" placeholder="Password"  id = 'orgPass' />
			
			<button type='submit'>Hospital Sign In</button>
		</form>}
	</div>
	<div class="overlay-container">
		<div class="overlay">
			<div class="overlay-panel overlay-left">
				<h1>Clinic</h1>
				<p>For Authorized medical practioners</p>
				<button class="ghost" id="signIn" >Hospital</button>
			</div>
			<div class="overlay-panel overlay-right">
			<h1>Hosptial</h1>
				<img src={HospitalImage}  style={{borderRadius: "8px"}} alt="" srcset="" />
				<p>Only for Authorized Hosptials</p>
				<button class="ghost" id="signUp">Clinic</button>
			</div>
		</div>
	</div>
</div>


 </div>
	
  )
}

export default HospitalLogin
