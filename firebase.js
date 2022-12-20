// Importar las funciones de firebase
import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore, CACHE_SIZE_UNLIMITED,enableIndexedDbPersistence  } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Configuración de firebase de mi proyecto
const firebaseConfig = {
    apiKey: "AIzaSyCE8rN-DsGsjmUlyS1a3UlqEt9HyO1MC6s",
    authDomain: "fundamentos-web-52d0b.firebaseapp.com",
    projectId: "fundamentos-web-52d0b",
    storageBucket: "fundamentos-web-52d0b.appspot.com",
    messagingSenderId: "174967519010",
    appId: "1:174967519010:web:43fe244d7c48ca9dbf177b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = initializeFirestore(app, {
    cacheSizeBytes: CACHE_SIZE_UNLIMITED});

// Exportar la base de datos
// export const db = getFirestore(app);

//Exportar el storage
export const storage = getStorage(app);

//Exportar el auth
export const auth = getAuth(app);

enableIndexedDbPersistence(db)
  .catch((err) => {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
  });