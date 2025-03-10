import {useEffect,useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import { SesionContexto } from '../context/SesionContexto.jsx';
import md5 from 'md5';


const InicioSesion = () => {
    const [lista, setLista] = useState([]);


    useEffect(() => {
        const getUsuarios = async () => {
        const res = await axios.get("https://mern-5pjx.onrender.com/api/usuarios");
        setLista(res.data);
        };
        getUsuarios();
    }, []);

    //Se obtiene la función de inicio de sesión de SesionContexto

    const {iniciarSesion} = useContext(SesionContexto);

    //Valores del usuario y contraseña

    const [usuario, setUsuario] = useState('');
    const [contrasenya, setContrasenya] = useState('');

    //Usado para navegar

    const navegar = useNavigate();

    //Función para manejar el inicio de sesión

    const manejarInicio = () => {

        //Si el usuario y contraseña son correctos, se inicia la sesión y te envia a bienvenida, de lo contrario te advierte de que las credenciales son incorrectas

        lista.forEach((list) => {
        
            if (list.nombre == usuario && list.password == md5(contrasenya)) {
                iniciarSesion(usuario);
                navegar('/');
            } else {
                alert('Credenciales incorrectas');
            }
        
        });

    };

    return(

        <div className='contenedor'>
            <h1>Iniciar sesion</h1>
            <input
                type='text'
                placeholder='Usuario'
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
            />
            <input
                type='password'
                placeholder='Contraseña'
                value={contrasenya}
                onChange={(e) => setContrasenya(e.target.value)}
            />
            <button onClick={manejarInicio}>Entrar</button>
        </div>

    );

};

export default InicioSesion;