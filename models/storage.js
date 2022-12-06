import {storage} from '../firebase'
import { ref, uploadBytes, getDownloadURL} from "firebase/storage";

export const uploadImage = async (file) => {
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = await uploadBytes(storageRef, file);

    //Devolver la URL de la imagen que se acaba de subir
    return await getDownloadURL(uploadTask.ref);
}