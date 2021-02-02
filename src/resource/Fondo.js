import React from "react";
import styled from "styled-components";
import { ReactComponent as Puntos } from "./../img/puntos.svg";

const Svg = styled.svg`
  height: 50vh;
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 0;
  path {
      //#b8dff0
    fill: rgba(184, 223, 240, 0.80); 
  }
`;

const PuntosArriba = styled(Puntos)`
  position: fixed;
  z-index: 1;
  top: 2.5rem; /* 40px */
  left: 2.5rem; /* 40px */
`;

const PuntosAbajo = styled(Puntos)`
  position: fixed;
  z-index: 1;
  bottom: 2.5rem; /* 40px */
  right: 2.5rem; /* 40px */
`;

const Fondo = () => {
  return (
    <>
      <PuntosAbajo />
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fillOpacity="1"
          d="M0,128L16,160C32,192,64,256,96,234.7C128,213,160,107,192,80C224,53,256,107,288,122.7C320,139,352,117,384,133.3C416,149,448,203,480,202.7C512,203,544,149,576,122.7C608,96,640,96,672,112C704,128,736,160,768,186.7C800,213,832,235,864,208C896,181,928,107,960,112C992,117,1024,203,1056,213.3C1088,224,1120,160,1152,160C1184,160,1216,224,1248,224C1280,224,1312,160,1344,133.3C1376,107,1408,117,1424,122.7L1440,128L1440,320L1424,320C1408,320,1376,320,1344,320C1312,320,1280,320,1248,320C1216,320,1184,320,1152,320C1120,320,1088,320,1056,320C1024,320,992,320,960,320C928,320,896,320,864,320C832,320,800,320,768,320C736,320,704,320,672,320C640,320,608,320,576,320C544,320,512,320,480,320C448,320,416,320,384,320C352,320,320,320,288,320C256,320,224,320,192,320C160,320,128,320,96,320C64,320,32,320,16,320L0,320Z"
        ></path>
      </Svg>
      <PuntosArriba />
    </>
  );
};

export default Fondo;
