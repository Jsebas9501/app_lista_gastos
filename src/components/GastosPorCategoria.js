import React from "react";
import { Header, Titulo } from "./../resource/Header";
import { Helmet } from "react-helmet";
import BtnRegresar from "./../resource/BtnRegresar";

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
    </>
  );
};

export default CastosPorCategoria;
