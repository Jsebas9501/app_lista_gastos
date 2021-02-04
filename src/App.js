import React from "react";
import { Helmet } from "react-helmet";
import {
  Header,
  Titulo,
  ContenedorBotones,
  ContenedorHeader,
} from "./resource/Header";
import { Boton } from "./resource/Boton";
import BotonCerrarSesion from './resource/BotonCerrarSesion';
import FormularioGasto from './components/FormularioGasto'

const App = () => {
  return (
    <>
      <Helmet>
        <title>Agregar Gasto</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Agregar Gasto</Titulo>
          <ContenedorBotones>
            <Boton to="/categorias">Categorias</Boton>
            <Boton to="/lista">Lista de Gastos</Boton>
            <BotonCerrarSesion/>
          </ContenedorBotones>
        </ContenedorHeader>
      </Header>
      <FormularioGasto/>
    </>
  );
};

export default App;
