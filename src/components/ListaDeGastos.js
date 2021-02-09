import React from "react";
import { Header, Titulo } from "./../resource/Header";
import { Helmet } from "react-helmet";
import BtnRegresar from "./../resource/BtnRegresar";
// import { useAuth } from "./../context/AuthContext";
import BarraTotalGastos from "./BarraTotalGastos";
import useObtenerGastos from "./../hooks/useObtenerGastos";
import {
  Lista,
  ElementoLista,
  Categoria,
  Descripcion,
  Valor,
  Fecha,
  ContenedorBotones,
  BotonAccion,
  BotonCargarMas,
  ContenedorBotonCentral,
  ContenedorSubtitulo,
  Subtitulo,
} from "./../resource/ElementosDeLista";
import IconoCategoria from "./../resource/IconoCategoria";
import convertirAMoneda from "./../funtions/convertirAMoneda";
import { ReactComponent as IconoEditar } from "./../img/editar.svg";
import { ReactComponent as IconoBorrar } from "./../img/borrar.svg";
import { Link } from "react-router-dom";
import { Boton } from "../resource/Boton";
import { format, fromUnixTime } from "date-fns";
import { es } from "date-fns/locale";
import borrarGasto from "./../firebase/borrarGasto";

const ListaDeGastos = () => {
  const [gastos, obtenerMasGastos, hayMasPorCargar] = useObtenerGastos();
  //console.log(gastos);

  const formatearFecha = (fecha) => {
    return format(fromUnixTime(fecha), "dd 'de' MMMM 'de' yyyy", {
      locale: es,
    });
  };

  const fechaEsIgual = (gastos, index, gasto) => {
    if (index !== 0) {
      const fechaActual = formatearFecha(gasto.fecha);
      const fechaGastoAnterior = formatearFecha(gastos[index - 1].fecha);

      if (fechaActual === fechaGastoAnterior) {
        return true;
      } else {
        return false;
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Lista de Gastos</title>
      </Helmet>

      <Header>
        <BtnRegresar />
        <Titulo>Lista de Gastos</Titulo>
      </Header>

      <Lista>
        {gastos.map((gasto, index) => {
          return (
            <div key={gasto.id}>
              {!fechaEsIgual(gastos, index, gasto) && (
                <Fecha>{formatearFecha(gasto.fecha)}</Fecha>
              )}

              <ElementoLista key={gasto.id}>
                <Categoria>
                  <IconoCategoria nombre={gasto.categoria} />
                  {gasto.categoria}
                </Categoria>

                <Descripcion>{gasto.descripcion}</Descripcion>
                <Valor>{convertirAMoneda(gasto.valor)}</Valor>

                <ContenedorBotones>
                  <BotonAccion as={Link} to={`/editar/${gasto.id}`}>
                    <IconoEditar />
                  </BotonAccion>
                  <BotonAccion onClick={() => borrarGasto(gasto.id)}>
                    <IconoBorrar />
                  </BotonAccion>
                </ContenedorBotones>
              </ElementoLista>
            </div>
          );
        })}

        {hayMasPorCargar && (
          <ContenedorBotonCentral>
            <BotonCargarMas
              onClick={() => {
                obtenerMasGastos();
              }}
            >
              Cargar Más
            </BotonCargarMas>
          </ContenedorBotonCentral>
        )}

        {gastos.length === 0 && (
          <ContenedorSubtitulo>
            <Subtitulo>No hay gastos por mostrar</Subtitulo>
            <Boton as={Link} to="/">
              Agregar Gasto
            </Boton>
          </ContenedorSubtitulo>
        )}
      </Lista>
      <BarraTotalGastos />
    </>
  );
};

export default ListaDeGastos;
