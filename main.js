import './style.css'
import { onGetMatriculas, guardarMatricula, editarMatricula, actualizarMatricula, eliminarMatricula } from './models/matricula'
import { app, auth } from './firebase'
import { signInWithPopup, GoogleAuthProvider,getRedirectResult, signInWithRedirect } from "firebase/auth";

import { uploadImage } from './models/storage'




let user = window.localStorage.getItem('user');
let id = null;
let editando = false;

const login = async () => {
  if (!localStorage.getItem('user')) {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    user = {
      name: result.user.displayName,
      photo: result.user.photoURL
    };
    //Create a window storage item to save user data
    localStorage.setItem('user', JSON.stringify(user));
  }

  //Read the window storage item to get user data
  user = JSON.parse(localStorage.getItem('user'));
  document.getElementById('userName').innerText = user.name;
  document.getElementById('userPhoto').src = user.photo;
}

window.addEventListener('DOMContentLoaded', async (e) => {
  const filas = document.getElementById('matriculas_registradas')

  onGetMatriculas((querySnapshot) => {
    filas.innerHTML = ''
    let i = 1;
    querySnapshot.forEach((doc) => {
      const matricula = doc.data();
      let id = doc.id;
      filas.innerHTML += `
    <tr>
    <td>${i++}</td>
    <td>${matricula.image ? '<img src="'+matricula.image+'" >' : ''}</td>
    <td>${matricula.nombres}</td>
    <td>${matricula.apellidos}</td>
    <td>${matricula.direccion}</td>
    <td>${matricula.celular}</td>
    <td>
    <button class="btn btn-editar" data-id="${id}">🖉 Editar</button>
    <button class="btn btn-borrar" data-id="${id}">🗑 Borrar</button>
    </td>
    </tr>`
    })



    const btnsEditar = filas.querySelectorAll(".btn-editar");
    btnsEditar.forEach((btn) =>
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        try {
          const data = await editarMatricula(dataset.id);
          document.getElementById("nombres").value = data.nombres;
          document.getElementById("apellidos").value = data.apellidos;
          document.getElementById("direccion").value = data.direccion;
          document.getElementById("celular").value = data.celular;

          id = dataset.id;
          editando = true;

          document.getElementById("btn").innerText = "Actualizar";

        } catch (error) {
          console.log(error);
        }
      })
    );


    const btnsEliminar = filas.querySelectorAll(".btn-borrar");
    btnsEliminar.forEach((btn) =>
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        try {
          await eliminarMatricula(dataset.id);
          

        } catch (error) {
          console.log(error);
        }
      })
    );
  });

  if (!user) {
    login();
  }
})


const matriculaForm = document.getElementById('matriculaForm')
matriculaForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const matricula = {};
  const nombres = document.getElementById('nombres').value
  const apellidos = document.getElementById('apellidos').value
  const direccion = document.getElementById('direccion').value
  const celular = document.getElementById('celular').value

  if (nombres.length > 0) {
    matricula.nombres = nombres;
  }
  if (apellidos.length > 0) {
    matricula.apellidos = apellidos;
  }
  if (direccion.length > 0) {
    matricula.direccion = direccion;
  }
  if (celular.length > 0) {
    matricula.celular = celular;
  }

  const image = document.getElementById('image')
  const file = image.files[0]
  if (file) {
    const result = await uploadImage(file);
    matricula.image = result;
  }

  if (!editando) {
    guardarMatricula(matricula);
  } else {
    actualizarMatricula(id, matricula);
    editando = false;
    document.getElementById("btn").innerText = "Guardar";
  }
  matriculaForm.reset();
})


