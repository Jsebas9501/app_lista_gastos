import React from "react";
import { Helmet } from "react-helmet";
import BtnRegresar from "./../resource/BtnRegresar";
import BarraTotalGastos from "./BarraTotalGastos";
import { Header, Titulo } from "./../resource/Header";
import FormularioGasto from "./FormularioGasto";
import { useParams } from "react-router-dom";
import useObtenerGasto from "./../hooks/useObtenerGasto";

const EditarGasto = () => {
  const { id } = useParams(); //obtengo el id que aparece en la barra de busqueda
  const [gasto] = useObtenerGasto(id);

  return (
    <>
      <Helmet>
        <title>Editar Gasto</title>
      </Helmet>

      <Header>
        <BtnRegresar />
        <Titulo>Editar Gasto</Titulo>
      </Header>
      <FormularioGasto gasto={gasto}/>
      <BarraTotalGastos />
    </>
  );
};

export default EditarGasto;
