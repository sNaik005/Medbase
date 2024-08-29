import { createContext, useState } from "react";
export const RecordsContext = createContext(null);

const RecordsProvider = ({children}) =>{
    const [vaccineRecs, setVaccineRecs] = useState([]);
    const [hospitalRecs, setHospitalRecs] = useState([]);
    const [testRecs, setTestRecs] = useState([]);
    const [clinicRecs , setClinicRecs] = useState([]);
    const [personal , setPersonal] = useState([]);
    const [hospDetails , setHospDetails] = useState([]);
    const [clinicDetails , setClinicDetails] = useState([]);
    const [currOrgUser , setCurrOrgUser] = useState();

    return(
        <RecordsContext.Provider value={{
            vaccineRecs,
            setVaccineRecs,
            testRecs,
            setTestRecs,
            hospitalRecs,
            setHospitalRecs,
            clinicRecs,
            setClinicRecs,
            personal,
            setPersonal,
            hospDetails,
            setHospDetails,
            clinicDetails , 
            setClinicDetails,
            currOrgUser, 
            setCurrOrgUser
    

        }}>
            {children}
        </RecordsContext.Provider>
    )
}

export default RecordsProvider;