import {useContext} from 'react';
import {Navigate} from 'react-router-dom';
import { SesionContexto } from '../context/SesionContexto';

//La sesión debe de estar iniciada o te manda de vuelta a la página de inicio de sesión.
//Esto se comprueba con la existencia del usuario.

const RutaProtegida = ({children}) => {

    const {usuario} = useContext(SesionContexto);

    return usuario ? children : <Navigate to="/inicio-sesion"/>;

};

export default RutaProtegida;