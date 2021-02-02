import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Header, Titulo, ContenedorHeader } from "./../resource/Header";
import { Boton } from "./../resource/Boton";
import {
  ContenedorBoton,
  Input,
  Formulario,
} from "./../resource/ElementosDeFormulario";
import { ReactComponent as SvgRegistro } from "./../img/registro.svg";
import styled from "styled-components";
import { auth } from "./../firebase/firebaseConfig";
import { useHistory } from "react-router-dom";
import Alerta from "./../resource/Alerta";

const Svg = styled(SvgRegistro)`
  width: 100%;
  max-height: 6.5rem; /*100px*/
  margin-bottom: 1.25rem; /*20px*/
`;

const RegistroUsuarios = () => {
  const history = useHistory();
  const [correo, establecerCorreo] = useState("");
  const [password, establecerPassword] = useState("");
  const [password2, establecerPassword2] = useState("");
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiarAlerta] = useState({});

  const handleChange = (e) => {
    switch (e.target.name) {
      case "email":
        establecerCorreo(e.target.value);
        break;
      case "password":
        establecerPassword(e.target.value);
        break;
      case "password2":
        establecerPassword2(e.target.value);
        break;

      default:
        break;
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

    if (correo === "" || password === "" || password2 === "") {
      //alerta
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "Por favor rellena todos los datos",
      });
      return;
    }

    if (password !== password2) {
      //alerta
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "Las constraseñas no coinciden ",
      });
      return;
    }

    try {
      //Crear nuevas cuentas en firebase
      await auth.createUserWithEmailAndPassword(correo, password);
      history.push("/");
    } catch (error) {
      cambiarEstadoAlerta(true);
      let mensaje;
      switch (error.code) {
        case "auth/invalid-password":
          mensaje = "La contraseña tiene que ser de al menos 6 caracteres.";
          break;
        case "auth/email-already-in-use":
          mensaje =
            "Ya existe una cuenta con el correo electrónico proporcionado.";
          break;
        case "auth/invalid-email":
          mensaje = "El correo electrónico no es válido.";
          break;
        default:
          mensaje = "Hubo un error al intentar crear la cuenta.";
          break;
      }
      cambiarAlerta({tipo:'error', mensaje: mensaje})
      console.log(mensaje);
    }
  };

  return (
    <>
      <Helmet>
        <title>Crear Cuenta</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Crear Cuenta</Titulo>
          <div>
            <Boton to="/iniciar-sesion">Iniciar Sesion</Boton>
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
        <Input
          type="password"
          name="password2"
          placeholder="Repetir la Contraseña"
          value={password2}
          onChange={handleChange}
        />
        <ContenedorBoton>
          <Boton as="button" primario type="submit">
            Crear Cuenta
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

export default RegistroUsuarios;
