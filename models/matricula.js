//Importar firestore
// Se agrega addDoc y collection para guardar los matriculas
import { collection, addDoc,getDocs, getDoc, query, orderBy, doc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";


export const onGetMatriculas = (callback) => onSnapshot(collection(db, "matriculas"), callback);

export const guardarMatricula = async (matricula) => {
    // Guardar la matricula en la base de datos
    return await addDoc(collection(db, "matriculas"), matricula);
};


export const editarMatricula = async (id) => {
    // Buscar la matricula
    const matriculaDoc = await getDoc(doc(db, "matriculas", id));
    return matriculaDoc.data();
};


//actualizar una matricula
export const actualizarMatricula = async (id, matricula) => {
    // Editar el matricula en la base de datos
    return await updateDoc(doc(db, "matriculas", id), matricula);
};

//Eliminar una matricula
export const eliminarMatricula = async (id) => {
    // Eliminar el matricula en la base de datos
    return await deleteDoc(doc(db, "matriculas", id));
}



