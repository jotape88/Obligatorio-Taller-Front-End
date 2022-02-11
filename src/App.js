import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react'
import Header from './components/Header/Header';
import IngresoRegistro from './components/IngresoRegistro/IngresoRegistro';
import Footer from './components/Footer/Footer';
import Contenido from './components/Contenido/Contenido';


const App = () => {

  let usuarioLogueado = JSON.parse(sessionStorage.getItem('usuario'));

  const [isLogin, setIsLogin] = useState(false);	 //Para el login

  if(!isLogin){ //Verificamos que el usuario no este logueado, si no lo esta, lo redirigimos al login
    return (
      <div className="App">
        <Header></Header>
          <IngresoRegistro></IngresoRegistro>
        <Footer></Footer>
      </div>
    )         
  }  
  return (
    <div className="App">

      <Header></Header>
       
      <Footer></Footer>

    </div>
  );
  


}

export default App;
