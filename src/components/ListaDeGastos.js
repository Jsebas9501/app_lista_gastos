import React from "react";
import { Header, Titulo } from "./../resource/Header";
import { Helmet } from "react-helmet";
import BtnRegresar from "./../resource/BtnRegresar";
// import { useAuth } from "./../context/AuthContext";

const ListaDeGastos = () => {
  return (
    <>
      <Helmet>
        <title>Lista de Gastos</title>
      </Helmet>

      <Header>
        <BtnRegresar />
        <Titulo>Lista de Gastos</Titulo>
      </Header>
    </>
  );
};

export default ListaDeGastos;
