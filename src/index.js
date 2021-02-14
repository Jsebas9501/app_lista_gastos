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
import RutaPrivada from "./resource/RutaPrivada";
import { TotalGastadoProvider } from "./context/TotalGastadoEnElMesContext";

const Index = () => {
  return (
    <>
      {/* Helmet sirve para poner las etiquetas que irian en el Head en HTML */}
      <Helmet>
        <link rel="shortcut icon" href={favicon} type="image/x-icon" />
      </Helmet>

      <AuthProvider>
        <TotalGastadoProvider>
          <BrowserRouter>
            <Contenedor>
              <Switch>
                <Route path="/iniciar-sesion" component={IncioSesion} />
                <Route path="/crear-cuenta" component={RegistroUsuarios} />

                <RutaPrivada path="/categorias">
                  <GastosPorCategoria />
                </RutaPrivada>
                <RutaPrivada path="/lista">
                  <ListaDeGastos />
                </RutaPrivada>
                <RutaPrivada path="/editar/:id">
                  <EditarGasto />
                </RutaPrivada>
                <RutaPrivada path="/">
                  <App />
                </RutaPrivada>

                {/* <Route path="/categorias" component={GastosPorCategoria} />
              <Route path="/lista" component={ListaDeGastos} />
              <Route path="/editar/:id" component={EditarGasto} />
              <Route path="/" component={App} /> */}
              </Switch>
            </Contenedor>
          </BrowserRouter>
        </TotalGastadoProvider>
      </AuthProvider>
      <Fondo />
    </>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));
