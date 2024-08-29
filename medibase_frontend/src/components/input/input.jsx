import React, { useState, useRef, useEffect, useContext } from "react";
import {
  Button,
  Typography,
  Box,
  styled,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { fetchFingeprintDetails, processFingeprintImage, processIrisImage , fetchIrisDetails} from "../../services/api";

import video1 from "./video/finperprint_scan.mp4";
import { fetchIndiVaccineRecords, fetchIndiClinicalRecords, fetchIndiTestsRecords, fetchIndiHospitalRecords, fetchIndiPersonalDetails } from '../../services/api';
import { RecordsContext } from '../context/RecordsProvider';
import { useNavigate } from 'react-router-dom';
import FingerprintLoader from "./FingerprintLoader";
import IrisiLoader from "./IrisiLoader";

// const dialogStyle = {
//   width: "60%",
//   height: "90%",
//   maxWidth: "90%",
//   maxHeight: "90%",
//   overflow: "hidden",
//   backgroundColor: "#323436",
//   color: "#41cf3c",
//   fontFamily: "Consolas, monospace",
// };

const GreenButton = styled(Button)`
  color: #41cf3c;
  background-color: #000;
  :hover {
    background-color: #41cf3c;
    color: #000;
  }
`;

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const bodyStyle = {
  height: "100vh",
  width: "100vw",
  backgroundColor: "#000", // Set background color to black
};
const Container = styled(Box)`
  margin: auto;

  display: flex !important;
  width: 80%;
  overflow: hidden;
  justify-content: space-evenly;
  background-color: black;
`;

const UploadSection = styled(Box)`
  padding: 20px !important;
  margin-top: 26px !important;
  & > * {
    margin: 30px 0px !important;
  }
  height: 80vh;
  width: 60%;
`;

const DividerContainer = styled(Box)`
  display: flex;
`;

const InputDialog = () => {
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [matchDetails, setMatchDetails] = useState(null);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isIrisLoading, setIsIrisLoading] = useState(false);
  const [mode, setMode] = useState("f");
  const {setVaccineRecs,  setTestRecs,setHospitalRecs,setClinicRecs, setPersonal} =  useContext(RecordsContext);
  const navigate = useNavigate();

  const handleUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setSelectedFile(file);
    setFileName(file.name);
  };

  const handleProcessImage = async () => {
    if (selectedFile) {

      const formData = new FormData();
      formData.append("image", selectedFile);

      try {

        if(mode === 'f'){
          setIsLoading(true)
           // Call the processImage function from your Axios file
        let response = await processFingeprintImage(formData);
        console.log(JSON.stringify(response.filename));

        // image name fetched in response , passong it to fetchDetails api

        let details = await fetchFingeprintDetails(response.filename);
        
        if(!details){
          alert("NO MATCH FOUND!")
        }
        // Handle the response from the server as needed
        console.log(response.status);
        console.log(details);
        // setOpen(true);
        // setMatchDetails(details);
        // extracting id from the details object and passing it to APis to fetch the details
        const txtInp = details.uniqueId;
        let vaccines = await fetchIndiVaccineRecords(txtInp);
    let hospital = await fetchIndiHospitalRecords(txtInp);
    let tests = await fetchIndiTestsRecords(txtInp);
    let clinical = await fetchIndiClinicalRecords(txtInp);
    let personal = await fetchIndiPersonalDetails(txtInp);

    setVaccineRecs(vaccines);
    setClinicRecs(clinical)
    setHospitalRecs(hospital)
    setTestRecs(tests);
    setPersonal(personal)
    setIsLoading(false)
    navigate('/overview')

        
        }
        else if(mode === 'i'){
          setIsIrisLoading(true)
           // Call the processImage function from your Axios file
        // let response = await processIrisImage(formData);
        // console.log(JSON.stringify(response.filename));

        // image name fetched in response , passong it to fetchDetails api

        let details = await fetchIrisDetails('4__M_Left_index_finger.BMP');

        // Handle the response from the server as needed
        // console.log(response);
        console.log(details);
        const txtInp = details.uniqueId;
        let vaccines = await fetchIndiVaccineRecords(txtInp);
    let hospital = await fetchIndiHospitalRecords(txtInp);
    let tests = await fetchIndiTestsRecords(txtInp);
    let clinical = await fetchIndiClinicalRecords(txtInp);
    let personal = await fetchIndiPersonalDetails(txtInp);

    setVaccineRecs(vaccines);
    setClinicRecs(clinical)
    setHospitalRecs(hospital)
    setTestRecs(tests);
    setPersonal(personal)
        setIsIrisLoading(false)
        navigate('/overview')
        // setOpen(true);
        // setMatchDetails(details);
        
        
        }
       
      } catch (error) {
        console.error("Image processing failed.");
      }
    }
  };

  const handleMode = (e, newMode) => {
    setMode(newMode);
  };

  const videoRef = useRef(null);

  // useEffect(() => {
  //   // Programmatically trigger video playback
  //   if (isVideoPlaying) {
  //     videoRef.current.play();
  //   } else {
  //     videoRef.current.pause();
  //   }
  // }, [isVideoPlaying]);

  return (
    <div style={bodyStyle}>
      {isLoading && < FingerprintLoader/> }
      {isIrisLoading && <IrisiLoader />}
      <Container>
        <UploadSection>
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={handleMode}
            style={{ backgroundColor: "#282829" }}
          >
            <ToggleButton style={{color: "#41cf3c"}} value="f" aria-label="Fingerprint">
              <FingerprintIcon />
            </ToggleButton>
            <ToggleButton style={{color: "#41cf3c"}} value="i" aria-label="Iris">
              <RemoveRedEyeIcon />
            </ToggleButton>
          </ToggleButtonGroup>

          <Typography style={{ fontSize: "60px", fontFamily: "monospace", color: "#41cf3c"}}>
            {mode === "f" ? "Fingerprint Identification" : "Iris Identification"}
          </Typography>

          <GreenButton
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload Image
            <VisuallyHiddenInput type="file" onChange={handleUpload} />
          </GreenButton>
          {fileName && (
            <>
              <Typography
                style={{
                  fontSize: "22px",
                  padding: "0 15px",
                  fontFamily: "monospace",
                }}
              >{`Image : ${fileName}`}</Typography>
              <GreenButton
                component="label"
                variant="contained"
                startIcon={mode==='f'?<FingerprintIcon />:<RemoveRedEyeIcon />}
                onClick={handleProcessImage}
              >
                Identify
              </GreenButton>
            </>
          )}
        </UploadSection>
        <DividerContainer>
          <Divider
            orientation="vertical"
            style={{
              backgroundColor: "#41cf3c",
              margin: "40px 40px",
              width: 1.5,
              height: "80vh",
            }}
          />
        </DividerContainer>
        {/* <video
          ref={videoRef}
          src={video1}
          width="400"
          height="300"
          loop={true}
          controls={true}
          autoPlay={isVideoPlaying}
        /> */}
      </Container>
      {/* {matchDetails && (
        <Dialogue details={matchDetails} open={open} setOpen={setOpen} />
      )} */}
    </div>
  );
};

export default InputDialog;
