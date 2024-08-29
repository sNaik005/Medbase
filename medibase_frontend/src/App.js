
import './App.css';
import React from 'react'; 
import { createTheme } from '@mui/material/styles'; 
import InputDialog from './components/input/input';

import {
  BrowserRouter as Router,
  Route,
  Routes,

} from "react-router-dom"; 

import IdInput from './components/portal/idInput';
import Overview from './components/portal/records/overview';
import Vaccines from './components/portal/records/Vaccines';
import RecordsProvider from './components/context/RecordsProvider';
import CommonAnalysis from './components/portal/PersonalAnalysis/CommonAnalysis';
import HospitalLogin from './components/portal/logins/HospitalLogin/HospitalLogin';
import HospitalPage from './components/endpoints/hospital/HospitalPage';
import AddData from './components/endpoints/hospital/AddData';
import HospitalAnalysis from './components/portal/PersonalAnalysis/HospitalAnalysis';
import AddClinicData from './components/endpoints/clinic/AddClinicData';
import Test from './components/portal/PersonalAnalysis/test';
import UserLogin from './components/portal/logins/UserLogin/UserLogin';
import Home from './components/portal/Home/Home';
import ClinicPage from './components/endpoints/clinic/ClinicPage';



const theme = createTheme({
  palette: {
    background: {
      default: "#000", 
    },
    text: {
      primary: "#41cf3c",
    },
  },
});

function App() {
  return (
    // <ThemeProvider theme={theme}>
    <RecordsProvider>
       <Router>
    
      <Routes>
        <Route exact path='/' element={<Home/>}>
        </Route>
        <Route exact path='/idinput' element={<IdInput/>}>
        </Route>
        <Route exact path='/biometricId' element={<InputDialog />}>
        </Route>
        <Route exact path='/login/userLogin' element={<UserLogin />}>
        </Route>
        <Route exact path='/overview' element={<Overview />}>
        </Route>
        <Route exact path='/vaccines' element={<Vaccines />}>
        </Route>
        <Route exact path='/hospitalPage' element={<HospitalPage />}>
        </Route>
        <Route exact path='/clinicPage' element={<ClinicPage />}>
        </Route>
        <Route exact path='/hospitalPage/addData' element={<AddData />}>
        </Route>
        <Route exact path='/clinicPage/addClinicData' element={<AddClinicData />}>
        </Route>
        <Route exact path='/commonAnalysis' element={<CommonAnalysis />}>
        </Route>
        <Route exact path='/test' element={<Test />}>
        </Route>
        <Route exact path='/hospitalAnalysis' element={<HospitalAnalysis />}>
        </Route>
        <Route exact path='/login/hospital' element={<HospitalLogin />}>
        </Route>
      </Routes>
     </Router>
    </RecordsProvider>
    // </ThemeProvider>
  );
}

export default App;
