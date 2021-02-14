import { useState, useEffect } from "react";
import { db } from "./../firebase/firebaseConfig";
import { startOfMonth, endOfMonth, getUnixTime } from "date-fns";
import { useAuth } from "./../context/AuthContext";

const useObternerGastosDelMes = () => {
  const [gastos, establecerGastos] = useState([]);
  const { usuario } = useAuth();

  useEffect(() => {
    const inicioDeMes = getUnixTime(startOfMonth(new Date()));
    const finDeMes = getUnixTime(endOfMonth(new Date()));

    if (usuario) {
      const unSuscribe = db
        .collection("gastos")
        .orderBy("fecha", "desc")
        .where("fecha", ">=", inicioDeMes)
        .where("fecha", "<=", finDeMes)
        .where("uidUsuario", "==", usuario.uid)
        .onSnapshot((snapshot) => {
          establecerGastos(
            snapshot.docs.map((documento) => {
              return { ...documento.data(), id: documento.id };
            })
          );
        });
      //Use Effect tiene ue retornar una funcion que se va a ejecutar cuando se desmonte el componente
      //En este caso queremos que ejecute el unSuscribe a la coleccion de firestore
      return unSuscribe;
    }
  }, [usuario]);

  return gastos;
};
export default useObternerGastosDelMes;
