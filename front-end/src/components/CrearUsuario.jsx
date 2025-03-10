import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';


const CrearUsuario = () => {
  const valorInicial = {
    nombre: '',
    apellido: '',
    edad: 18,
    telefono: 6,
    correo: '',
    contrasenya: '',
    foto: ''
  };
 
  let { id } = useParams(); // Capturar el id de la URL


  const [usuario, setUsuario] = useState(valorInicial); // Estado para los datos del usuario
  const [foto, setFoto] = useState(null); // Estado para la foto del socio
  const [subId, setSubId] = useState(id); // Estado para el id del socio


  const capturarDatos = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };


  const capturarFoto = (e) => {
    setFoto(e.target.files[0]); // Guardar la foto seleccionada
  };


  const guardarDatos = async (e) => {
    e.preventDefault(); // Evita recargar la página


    // Crear un objeto FormData para enviar los datos del usuario y la foto
    const formData = new FormData();
    formData.append('nombre', usuario.nombre);
    formData.append('apellido', usuario.apellido);
    formData.append('edad', usuario.edad);
    formData.append('telefono', usuario.telefono);
    formData.append('correo', usuario.correo);
    formData.append('contrasenya', usuario.contrasenya);

    if (foto) {
      formData.append('foto', foto); // Añadir la foto al formulario
    }


    try {
      // Enviar datos al backend
      await axios.post('https://mern-5pjx.onrender.com/api/usuarios', formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Especificar el tipo de contenido
        }
      });


      // Reiniciar el formulario
      setUsuario({ ...valorInicial });
      setFoto(null); // Vaciar la foto seleccionada
    } catch (error) {
      console.error('Error al guardar los datos:', error);
    }
  };


  // Función para actualizar un usuario
  const actualizarUser = async (e) => {
    e.preventDefault(); // Evita recargar la página


    // Crear un objeto FormData para enviar los datos del usuario y la foto
    const formData = new FormData();
    formData.append('nombre', usuario.nombre);
    formData.append('apellido', usuario.apellido);
    formData.append('edad', usuario.edad);
    formData.append('telefono', usuario.telefono);
    formData.append('correo', usuario.correo);
    formData.append('contrasenya', usuario.contrasenya);
    if (foto) {
      formData.append('foto', foto); // Añadir la foto al formulario si se ha seleccionado una nueva
    }


    try {
      // Enviar datos al backend
      await axios.put(`https://mern-5pjx.onrender.com/api/usuarios/${subId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Especificar el tipo de contenido
        }
      });


      // Reiniciar el formulario
      setUsuario({ ...valorInicial });
      setFoto(null); // Vaciar la foto seleccionada
      setSubId('');
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
    }
  };


  const obtUno = async (id) => { // Función para obtener un usuario y mostrar la información en el formulario
    try {
      const res = await axios.get(`https://mern-5pjx.onrender.com/api/usuarios/${id}`);
      setUsuario({
        nombre: res.data.nombre,
        apellido: res.data.apellido,
        edad: res.data.edad,
        telefono: res.data.telefono,
        correo: res.data.correo,
        contrasenya: res.data.contrasenya
      });
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
    }
  };


  // Si se está editando un usuario, cargar los datos del usuario
  useEffect(() => {
    if (subId) {
      obtUno(subId);
    }
  }, [subId]);

  function limpiarCampo(campo) {
    // Limpiar el valor del campo para evitar ataques de inyección
    if (campo && (campo.type === "text" || campo.type === "textarea" || campo.type === "password")) {
      let valor = campo.value.trim();
  
      // Reemplazar caracteres especiales comunes en ataques XSS y SQL Injection
      valor = valor.replace(/<script.*?>.*?<\/script>/gi, ""); // Eliminar etiquetas <script>
      valor = valor.replace(/<\/?[^>]+(>|$)/g, ""); // Eliminar cualquier otra etiqueta HTML
      valor = valor.replace(/['"\\;]/g, ""); // Eliminar comillas, barras invertidas y punto y coma
      valor = valor.replace(/--/g, ""); // Eliminar comentarios de SQL (--) si se usa en un entorno de base de datos
  
      // Eliminar espacios adicionales o caracteres no deseados
      campo.value = valor;
    }
  }
  

  return (
    <div className="col-md-6 offset-md-3">
      <div className="card card-body">
        <form onSubmit={guardarDatos}>
          <h2 className="text-center mb-3">Crear Socio</h2>
          <div className="mb-3">
            <label>Nombre:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingresa el nombre del socio"
              required
              name="nombre"
              value={limpiarCampo(usuario.nombre)}
              onChange={capturarDatos}
            />
          </div>
          <div className="mb-3">
            <label>Apellido:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingresa el apellido del socio"
              required
              name="apellido"
              value={limpiarCampo(usuario.apellido)}
              onChange={capturarDatos}
            />
          </div>
          <div className="mb-3">
            <label>Edad:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Ingresa la edad del socio"
              required
              name="edad"
              value={limpiarCampo(usuario.edad)}
              onChange={capturarDatos}
            />
          </div>
          <div className="mb-3">
            <label>Teléfono:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Ingresa el teléfono del socio"
              required
              name="telefono"
              value={limpiarCampo(usuario.telefono)}
              onChange={capturarDatos}
            />
          </div>
          <div className="mb-3">
            <label>Correo:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingresa el correo del socio"
              required
              name="correo"
              value={limpiarCampo(usuario.correo)}
              onChange={capturarDatos}
            />
          </div>
          <div className="mb-3">
            <label>Contraseña:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingresa la contraseña del socio"
              required
              name="contrasenya"
              value={limpiarCampo(usuario.contrasenya)}
              onChange={capturarDatos}
            />
          </div>
          <div className="mb-3">
            <label>Foto del socio:</label>
            <input
              type="file"
              className="form-control"
              accept="image/*" // Aceptar solo imágenes
              onChange={capturarFoto}
            />
          </div>
          <div className="text-center">
            <button className="btn btn-dark">Guardar</button>
          </div>
        </form>


        <form onSubmit={actualizarUser} className='text-center'>
          <button className="btn btn-dark mt-2">
            Actualizar
          </button>
        </form>


      </div>
    </div>
  );
};


export default CrearUsuario;