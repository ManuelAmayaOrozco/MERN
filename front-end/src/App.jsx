import './App.css'
import {Routes, Route, Navigate} from 'react-router-dom';
import RutaProtegida from './components/RutaProtegida.jsx';
import InicioSesion from './components/InicioSesion.jsx';
import Navegacion from './components/Navegacion';
import CrearUsuarios from './components/CrearUsuario';
import ListaUsuarios from './components/ListaUsuario';


function App() {


  return (
    <div className=''>
      <Navegacion/>
      <div className='container p-4'>
          <Routes>
            <Route path="/inicio-sesion" element={<InicioSesion />} />
            <Route path='/' element={<RutaProtegida><ListaUsuarios/></RutaProtegida>}/>
            <Route path='/CrearUsuario' element={<CrearUsuarios/>}/>
            <Route path='/edit/:id' element={<RutaProtegida><CrearUsuarios/></RutaProtegida>}/>
            <Route path="*" element={<Navigate to="/inicio-sesion"/>}/>
          </Routes>
      </div>
    </div>
  )
}


export default App
