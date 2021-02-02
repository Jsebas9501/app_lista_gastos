import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.css";
import App from "./App";
import Contenedor from "./resource/Contenedor";
import EditarGasto from "./components/EditarGasto";
import GastosPorCategoria from "./components/GastosPorCategoria";
import IncioSesion from "./components/InicioSesion";
import ListaDeGastos from "./components/ListaDeGastos";
import RegistroUsuarios from "./components/RegistroUsuarios";
import { Helmet } from "react-helmet";
import favicon from "./img/logo.png";
import Fondo from "./resource/Fondo";
import { AuthProvider } from "./context/AuthContext";

const Index = () => {
  return (
    <>
      {/* Helmet sirve para poner las etiquetas que irian en el Head en HTML */}
      <Helmet>
        <link rel="shortcut icon" href={favicon} type="image/x-icon" />
      </Helmet>

      <AuthProvider>
        <BrowserRouter>
          <Contenedor>
            <Switch>
              <Route path="/iniciar-sesion" component={IncioSesion} />
              <Route path="/crear-cuenta" component={RegistroUsuarios} />
              <Route path="/categorias" component={GastosPorCategoria} />
              <Route path="/lista" component={ListaDeGastos} />
              <Route path="/editar/:id" component={EditarGasto} />
              <Route path="/" component={App} />
            </Switch>
          </Contenedor>
        </BrowserRouter>
      </AuthProvider>
      <Fondo />
    </>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));
