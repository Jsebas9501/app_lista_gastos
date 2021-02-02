import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Header, Titulo, ContenedorHeader } from "./../resource/Header";
import { Boton } from "./../resource/Boton";
import {
  ContenedorBoton,
  Input,
  Formulario,
} from "./../resource/ElementosDeFormulario";
import { ReactComponent as SvgLogin } from "./../img/login.svg";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { auth } from "./../firebase/firebaseConfig";
import Alerta from "./../resource/Alerta";

const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 12.5rem; /*200px*/
  margin-bottom: 1.25rem; /*20px*/
`;

const InicioSesion = () => {
  const history = useHistory();
  const [correo, establecerCorreo] = useState("");
  const [password, establecerPassword] = useState("");
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiarAlerta] = useState({});

  const handleChange = (e) => {
    if (e.target.name === "email") {
      establecerCorreo(e.target.value);
    } else if (e.target.name === "password") {
      establecerPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    //Con async definimos que la funcion es una funcion asincrona, que se ejecuta de fondo
    e.preventDefault();
    cambiarEstadoAlerta(false);
    cambiarAlerta({});

    //Comprobaamos del lado del cliente que el correo es valido
    const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
    if (!expresionRegular.test(correo)) {
      //Alerta
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "Por favor ingresa un correo electronico valido",
      });
      return;
    }

    if (correo === "" || password === "") {
      //alerta
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "Por favor rellena todos los datos",
      });
      return;
    }

    try {
      //Auntenticacion en el inicio de secion 
      await auth.signInWithEmailAndPassword(correo, password);
      history.push("/");
    } catch (error) {
      cambiarEstadoAlerta(true);
      let mensaje;
      switch (error.code) {
        case "auth/wrong-password":
          mensaje = "La contraseña no es correcta.";
          break;
        case "auth/user-not-found":
          mensaje =
            "No se encontro ninguna cuenta con este correo electronico.";
          break;
        default:
          mensaje = "Hubo un error al intentar iniciar sesion.";
          break;
      }
      cambiarAlerta({ tipo: "error", mensaje: mensaje });
      console.log(mensaje);
    }
  };

  return (
    <>
      <Helmet>
        <title>Iniciar Sesion</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Iniciar Sesion</Titulo>
          <div>
            <Boton to="/crear-cuenta">Registrarse</Boton>
          </div>
        </ContenedorHeader>
      </Header>

      <Formulario onSubmit={handleSubmit}>
        <Svg />
        {/* <Input type="text" name="usuario" placeholder="Nombre de Usuario"/> */}
        <Input
          type="email"
          name="email"
          placeholder="Correo Electronico"
          value={correo}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={password}
          onChange={handleChange}
        />
        <ContenedorBoton>
          <Boton as="button" primario type="submit">
            Iniciar Sesison
          </Boton>
        </ContenedorBoton>
      </Formulario>
      <Alerta
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        estadoAlerta={estadoAlerta}
        cambiarEstadoAlerta={cambiarEstadoAlerta}
      />
    </>
  );
};

export default InicioSesion;
