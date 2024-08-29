import styled from '@emotion/styled'
import { Box, Container, Typography } from '@mui/material'
import React, { useContext } from 'react'
import PhotoCard from './PhotoCard'
import { RecordsContext } from '../../context/RecordsProvider'


const ParentContainer = styled(Box)`
@import url('https://fonts.googleapis.com/css?family=Varela+Round');
width : 80%;
height : 30vh;
margin: 40px auto;
background: #fff;
overflow  : hidden;
border-radius : 8px;
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
font-family: 'Varela Round', sans-serif;

`
const InnerContainer = styled(Container)`
display: flex;
align-items : center;
justify-content : space-around;
margin : 20px 0px;
padding : 0 20px
flex-wrap : wrap;
`

const DetailsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Three columns for label-value pairs */
  align-items: center;
  grid-column-gap: 1px; /* Adjust this value to reduce the gap between columns */

  margin: 0px;
  width: calc(100% - 0px);
  max-width: 50%;
`;

const typoStyle = {
  font: "'Montserrat', sans-serif",
    paddingBottom : "30px",
    fontSize : "1.2rem"
    
}
const Profile = () => {
    const {personal} = useContext(RecordsContext)
    const details = personal;
  return (
    <ParentContainer>
        <InnerContainer>
          <div className="d-flex flex-column">
          <h2>{details.name}</h2>
          {/* <h2>UniqueId: {details.uniqueId}</h2> */}
          </div>
            <DetailsContainer>

                <Typography sx={typoStyle}>Aadhar : {details.aadhar}</Typography>
                
                <Typography sx={typoStyle}>Date of Birth : {details.dob} </Typography>
                
                <Typography sx={typoStyle}>Gender : {details.gender}</Typography>
                
                <Typography sx={typoStyle}>Contact : {details.mobile}</Typography>
               
                <Typography sx={typoStyle}>Address : {details.address}</Typography>
               
                <Typography sx={typoStyle}>Blood Group : {details.bldgp}</Typography>
                

            </DetailsContainer>
            {/* <i class="fa-solid fa-user fa-10x" ></i> */}
            {/* <PhotoCard name = {details.name} photo = {details.photo}/> */}
            <div className=" card" style={{ marginLeft:"40px",height: "12rem", width: "12rem" }}>
            <img src={details?.photo} class="card-img-top" alt="Photo" />
            <div class="card-body"></div>
          </div>
        </InnerContainer>
    </ParentContainer>    
  )
}

export default Profile