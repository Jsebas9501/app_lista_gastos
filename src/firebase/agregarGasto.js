import {db} from './firebaseConfig';

const agregarGasto = ({categoria, descripcion, valor, fecha, uidUsuario}) => {
	return db.collection('gastos').add({
		categoria: categoria,
		descripcion: descripcion,
		valor: Number(valor),
		fecha: fecha,
		uidUsuario: uidUsuario
	});
}

export default agregarGasto;