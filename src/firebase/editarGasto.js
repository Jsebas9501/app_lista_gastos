import {db} from './firebaseConfig';

const editarGasto = ({id, categoria, descripcion, valor, fecha}) => {
	return db.collection('gastos').doc(id).update({
		categoria: categoria,
		descripcion: descripcion,
		valor: Number(valor),
		fecha: fecha
	});
}

export default editarGasto;