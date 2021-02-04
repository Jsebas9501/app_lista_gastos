import React, { useState } from "react";
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
import fromUnixTime from "date-fns/fromUnixTime";
import getUnixTime from "date-fns/getUnixTime";
import agregarGasto from "./../firebase/agregarGasto";
import { useAuth } from "./../context/AuthContext";
import Alerta from "./../resource/Alerta";

const FormularioGasto = () => {
  const [inputDescripcion, cambiarInputDescripcion] = useState();
  const [inputValor, cambiarInputValor] = useState();
  const [categoria, cambiarCategoria] = useState("Hogar");
  const [fecha, cambiarFecha] = useState(new Date());
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiarAlerta] = useState({});
  const { usuario } = useAuth();

  const handleChange = (e) => {
    if (e.target.name === "descripcion") {
      cambiarInputDescripcion(e.target.value);
    } else if (e.target.name === "valor") {
      //Replace expecion regular para no permitir escribir letras
      cambiarInputValor(e.target.value.replace(/[^0-9.]/g, ""));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //Agregar dos decimales al valor
    let valor = parseFloat(inputValor).toFixed(2);

    console.log(categoria, inputDescripcion, valor, getUnixTime(fecha), usuario.uid );

    //Comprobamos que haya una descripcion y valor
    if (inputDescripcion !== "" && inputValor !== "") {
      //Comprobamos que el valor ingresado sea correcto
      if (valor) {
        
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
        .catch((error)=>{
          cambiarEstadoAlerta(true);
          cambiarAlerta({
            tipo: "error",
            mensaje: "Hubo un problema al intentar ingresar el gasto",
          });
        })
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
          Agregar Gasto <IconoPlus />
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
