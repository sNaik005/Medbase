import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import GaugeChart from "react-gauge-chart";
import { RecordsContext } from "../../context/RecordsProvider";
import { Typography } from "@mui/material";
import "./css/commonAnalysis.css";
import Test from "./test";
import { getBpSugarChol } from "../../../services/api";

const CommonAnalysis = () => {
  // const { search } = useLocation();
  // const queryParams = new URLSearchParams(search);
  // const responseData = JSON.parse(decodeURIComponent(queryParams.get('responseData')));

  const [sysBp, setSysBp] = useState();
  const [diaBp, setDiaBp] = useState();
  const [chol, setChol] = useState(0);
  const [sugar, setSugar] = useState(0);

  const { personal, testRecs } = useContext(RecordsContext);
  console.log(personal.weight / personal.height ** 2);
  console.log(personal.weight);
  console.log(personal.height);
  const BMI = personal.weight / personal.height ** 2;

  useEffect(() => {
    console.log("client", personal?.uniqueId);

    const fetchData = async () => {
      try {
        console.log("client", personal.uniqueId);
        const resp = await getBpSugarChol({patientId:personal.uniqueId});
        setSugar(resp.SugarLevels);
        setChol(resp.CholesterolLevels);
        const bpParts = resp.BloodPressure.split("/");
        setDiaBp(bpParts[0]);
        setSysBp(bpParts[1]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  });

  return (
    <div>
      <br />
      <h2 style={{ marginX: "auto" }}>Analysis</h2>
      <div className="wrapContainer">
        <GaugeChart
          id="gauge-chart2"
          nrOfLevels={26}
          percent={BMI * 100}
          hideText={true}
          textColor="#000"
          style={{ width: 250 }}
        />
        <Typography
          style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "2.5em" }}
        >
          {(BMI * 10000).toFixed(2)}
        </Typography>
        <Typography
          style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "1.5em" }}
        >
          BMI
        </Typography>
      </div>

      <div className="wrapContainer my-5">
        <div className="d-flex">
          <div className="d-flex flex-column align-items-center">
            <Test
              metric={(Number(sugar) / 250) * 100}
              text={sugar}
              unit={" mg/dL"}
            />
            <Typography
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "1.5em",
              }}
            >
              Sugar
            </Typography>
          </div>
          <div className="d-flex flex-column align-items-center">
            <Test
              metric={(Number(chol) / 270) * 100}
              text={chol}
              unit={" mg/dL"}
            />
            <Typography
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "1.5em",
              }}
            >
              Cholestrol
            </Typography>
          </div>
          <div className="d-flex flex-column align-items-center">
            <Test
              metric={(Number(sysBp) / 100) * 100}
              text={sysBp}
              unit={" hg"}
            />
            <Typography
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "1.5em",
              }}
            >
              Systolic BP
            </Typography>
          </div>
          <div className="d-flex flex-column align-items-center">
            <Test
              metric={(Number(diaBp) / 160) * 100}
              text={diaBp}
              unit={" hg"}
            />
            <Typography
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "1.5em",
              }}
            >
              Diastolic BP
            </Typography>
          </div>
        </div>
        <h6>*Values are fetched from the latest tests you have done</h6>
      </div>

      <div className="wrapContainer hwContainer ">
        <div className="d-flex justify-content-between ">
          <div className="d-flex flex-column align-items-center justify-content-between">
            <i class="fa-solid fa-4x fa-scale-unbalanced-flip"></i>
            <Typography
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "1.5em",
              }}
            >
              Weight
            </Typography>
            <div
              role="progressbar"
              aria-valuenow={personal.weight}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ "--value": personal.weight }}
            ></div>
          </div>
          <div className="d-flex align-items-center flex-column ">
            <div
              role="progressbar1"
              aria-valuenow={personal.height}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ "--value": personal.height }}
            ></div>
            <i class="fa-solid fa-4x fa-up-down"></i>
            <Typography
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "1.5em",
              }}
            >
              Height
            </Typography>
          </div>
        </div>
        <h6>*Values are fetched from your latest clinic visit update</h6>
      </div>

      
    </div>
  );
};

export default CommonAnalysis;
