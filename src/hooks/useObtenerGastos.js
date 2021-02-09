import { useState, useEffect } from "react";
import { db } from "./../firebase/firebaseConfig";
import { useAuth } from "./../context/AuthContext";

const useObtenerGastos = () => {
  const { usuario } = useAuth();
  const [gastos, cambiarGastos] = useState([]);
  const [ultimoGasto, cambiarUltimoGasto] = useState(null);
  const [hayMasPorCargar, cambiarHayMasPorCargar] = useState(false);

  const obtenerMasGastos = () => {
    db.collection("gastos")
      .where("uidUsuario", "==", usuario.uid)
      .orderBy("fecha", "desc")
      .limit(10)
      .startAfter(ultimoGasto)
      .onSnapshot((snapshot) => {
        if (snapshot.docs.length > 0) {
          cambiarUltimoGasto(snapshot.docs[snapshot.docs.length - 1]);

          //El arreglo va tener todos los gastos
          cambiarGastos(
            gastos.concat(
              snapshot.docs.map((gasto) => {
                return { ...gasto.data(), id: gasto.id };
              })
            )
          );
        } else {
          cambiarHayMasPorCargar(false);
        }
      });
  };

  useEffect(() => {
    const unSuscribe = db
      .collection("gastos")
      .where("uidUsuario", "==", usuario.uid) //Gastos para el usuario en sesión
      .orderBy("fecha", "desc") //Ordena los gastos de forma desendente por la fecha
      .limit(10) // Solo muestra 10 gastos, si tiene mas los carga con un boton

      .onSnapshot((snapshot) => {
        if (snapshot.docs.length > 0) {
          cambiarUltimoGasto(snapshot.docs[snapshot.docs.length - 1]);
          cambiarHayMasPorCargar(true);
        } else {
          cambiarHayMasPorCargar(false);
        }

        cambiarGastos(
          snapshot.docs.map((gasto) => {
            return { ...gasto.data(), id: gasto.id };
          })
        );
      });
    return unSuscribe;
  }, [usuario]);

  return [gastos, obtenerMasGastos, hayMasPorCargar];
};

export default useObtenerGastos;
