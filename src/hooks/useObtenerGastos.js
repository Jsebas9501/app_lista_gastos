import { useState, useEffect } from "react";
import { db } from "./../firebase/firebaseConfig";
import { useAuth } from "./../context/AuthContext";

const useObtenerGastos = () => {
  const { usuario } = useAuth();
  const [gastos, cambiarGastos] = useState([]);

  useEffect(() => {
    const unSuscribe = db
      .collection("gastos")
      .where("uidUsuario", "==", usuario.uid) //Gastos para el usuario en sesión
      .orderBy("fecha", "desc") //Ordena los gastos de forma desendente por la fecha
      .limit(10) // Solo muestra 10 gastos, si tiene mas los carga con un boton

      .onSnapshot((snapshot) => {
        cambiarGastos(
          snapshot.docs.map((gasto) => {
            return { ...gasto.data(), id: gasto.id };
          })
        );
      });
    return unSuscribe;
  }, [usuario]);

  return [gastos];
};

export default useObtenerGastos;
