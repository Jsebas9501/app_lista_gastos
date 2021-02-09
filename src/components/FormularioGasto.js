import React, { useState, useEffect } from "react";
import {
  ContenedorBoton,
  ContenedorFiltros,
  Input,
  InputGrande,
  Formulario,
} from "./../resource/ElementosDeFormulario";
import { Boton } from "./../resource/Boton";
import { ReactComponent as IconoPlus } from "./../img/plus.svg";
import SelectCategorias from "./SelectCategorias";
import DatePicker from "./DatePicker";
import getUnixTime from "date-fns/getUnixTime";
import agregarGasto from "./../firebase/agregarGasto";
import { useAuth } from "./../context/AuthContext";
import Alerta from "./../resource/Alerta";
import fromUnixTime from "date-fns/fromUnixTime";
import { useHistory } from "react-router-dom";
import editarGasto from "./../firebase/editarGasto";

const FormularioGasto = ({ gasto }) => {
  //Estados
  const [inputDescripcion, cambiarInputDescripcion] = useState();
  const [inputValor, cambiarInputValor] = useState();
  const [categoria, cambiarCategoria] = useState("hogar");
  const [fecha, cambiarFecha] = useState(new Date());
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiarAlerta] = useState({});
  const { usuario } = useAuth();
  const history = useHistory();

  useEffect(() => {
    //Comprobamos si ya hay algun gasto
    //De ser asi establecemos todo el estado con los valores del gasto
    if (gasto) {
      //Comprobamos que le gasto sea del usuari actual
      //Para eso comprobamos el uid guardado en el gasto con el uid del usuario
      if (gasto.data().uidUsuario === usuario.uid) {
        cambiarCategoria(gasto.data().categoria);
        cambiarFecha(fromUnixTime(gasto.data().fecha));
        cambiarInputDescripcion(gasto.data().descripcion);
        cambiarInputValor(gasto.data().valor);
      } else {
        history.push("/lista");
      }
    }
  }, [gasto, usuario, history]);

  const handleChange = (e) => {
    if (e.target.name === "descripcion") {
      cambiarInputDescripcion(e.target.value);
    } else if (e.target.name === "valor") {
      //Replace exprecion regular para no permitir escribir letras
      cambiarInputValor(e.target.value.replace(/[^0-9.]/g, ""));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //Agregar dos decimales al valor
    let valor = parseFloat(inputValor).toFixed(2);

    //console.log(categoria, inputDescripcion, valor, getUnixTime(fecha), usuario.uid );

    //Comprobamos que haya una descripcion y valor
    if (inputDescripcion !== "" && inputValor !== "") {
      //Comprobamos que el valor ingresado sea correcto
      if (valor) {
        if (gasto) {
          editarGasto({
            id: gasto.id,
            categoria: categoria,
            descripcion: inputDescripcion,
            valor: valor,
            fecha: getUnixTime(fecha),
          }).then(() => {
            history.push("/lista");
          });
        } else {
          agregarGasto({
            categoria: categoria,
            descripcion: inputDescripcion,
            valor: valor,
            fecha: getUnixTime(fecha),
            uidUsuario: usuario.uid,
          })
            .then(() => {
              //Reiniciamos a los valores predeterminados despues de agregar el gasto
              cambiarCategoria("hogar");
              cambiarInputDescripcion("");
              cambiarInputValor("");
              cambiarFecha(new Date());

              //Alerta de Exito
              cambiarEstadoAlerta(true);
              cambiarAlerta({
                tipo: "exito",
                mensaje: "El gasto fue agregado correctamente",
              });
            })
            .catch((error) => {
              cambiarEstadoAlerta(true);
              cambiarAlerta({
                tipo: "error",
                mensaje: "Hubo un problema al intentar ingresar el gasto",
              });
            });
        }
      } else {
        cambiarEstadoAlerta(true);
        cambiarAlerta({
          tipo: "error",
          mensaje: "El valor que ingresaste no es correcta",
        });
      }
    } else {
      //Alerta
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "Por favor rellena todos los campos.",
      });
    }
  };

  return (
    <Formulario onSubmit={handleSubmit}>
      <ContenedorFiltros>
        <SelectCategorias
          categoria={categoria}
          cambiarCategoria={cambiarCategoria}
        />
        <DatePicker fecha={fecha} cambiarFecha={cambiarFecha} />
      </ContenedorFiltros>
      <div>
        <Input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={inputDescripcion}
          onChange={handleChange}
        />
        <InputGrande
          type="text"
          name="valor"
          placeholder="$0.000"
          value={inputValor}
          onChange={handleChange}
        />
      </div>
      <ContenedorBoton>
        <Boton as="button" primario conIcono type="submit">
          {gasto ? 'Editar Gasto' : 'Agregar Gasto'} <IconoPlus />
        </Boton>
      </ContenedorBoton>
      <Alerta
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        estadoAlerta={estadoAlerta}
        cambiarEstadoAlerta={cambiarEstadoAlerta}
      />
    </Formulario>
  );
};

export default FormularioGasto;
