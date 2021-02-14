import React from "react";
import { Header, Titulo } from "./../resource/Header";
import { Helmet } from "react-helmet";
import BtnRegresar from "./../resource/BtnRegresar";
import BarraTotalGastos from "./BarraTotalGastos";
import useObtenerGastosDelMesPorCategoria from "./../hooks/useObtenerGastosDelMesPorCategoria";
import {
  ListaDeCategorias,
  ElementoListaCategorias,
  Categoria,
  Valor,
} from "./../resource/ElementosDeLista";
import IconoCategoria from "./../resource/IconoCategoria";
import convertirAMoneda from './../funtions/convertirAMoneda'

const CastosPorCategoria = () => {
  const gastosPorCategoria = useObtenerGastosDelMesPorCategoria();

  return (
    <>
      <Helmet>
        <title>Gastos por Categoria</title>
      </Helmet>

      <Header>
        <BtnRegresar />
        <Titulo>Gastos por Categoria</Titulo>
      </Header>

      <ListaDeCategorias>
        {gastosPorCategoria.map((elemento, index) => {
          return (
            <ElementoListaCategorias key={index}>
              <Categoria>
                <IconoCategoria nombre={elemento.categoria} /> {elemento.categoria}
              </Categoria>
              <Valor>{convertirAMoneda(elemento.valor)}</Valor>
            </ElementoListaCategorias>
          );
        })}
      </ListaDeCategorias>

      <BarraTotalGastos />
    </>
  );
};

export default CastosPorCategoria;
