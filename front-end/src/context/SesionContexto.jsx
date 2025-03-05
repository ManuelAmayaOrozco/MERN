import {createContext, useState} from 'react';

//Usando createContext, se genera el contexto de la sesión, la cual mantiene una serie de funciones que podemos pasar a otras páginas.

export const SesionContexto = createContext();

export const ProveedorSesion = ({children}) =>{

    //El usuario de la sesión

    const [usuario, setUsuario] = useState(null);

    //Inicia la sesión actualizando el usuario

    const iniciarSesion = (nombreUsuario) => {

        setUsuario(nombreUsuario);

    };

    //Cierra la sesión volviendo null al usuario para que no exista

    const cerrarSesion = () => {

        setUsuario(null);

    };

    //Retorna el usuario y las funciones para iniciar y cerrar la sesión

    return (

        <SesionContexto.Provider
            value={{usuario, iniciarSesion, cerrarSesion}}>
                {children}
        </SesionContexto.Provider>

    );

};