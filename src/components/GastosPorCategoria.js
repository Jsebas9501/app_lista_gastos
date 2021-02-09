import React from "react";
import { Header, Titulo } from "./../resource/Header";
import { Helmet } from "react-helmet";
import BtnRegresar from "./../resource/BtnRegresar";
import BarraTotalGastos from './BarraTotalGastos';

const CastosPorCategoria = () => {
  return (
    <>
      <Helmet>
        <title>Gastos por Categoria</title>
      </Helmet>

      <Header>
        <BtnRegresar />
        <Titulo>Gastos por Categoria</Titulo>
      </Header>
      <BarraTotalGastos/>
    </>
  );
};

export default CastosPorCategoria;
