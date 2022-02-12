import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react'
import Header from './components/Header/Header';
import IngresoRegistro from './components/IngresoRegistro/IngresoRegistro';
import Footer from './components/Footer/Footer';
import Contenido from './components/Contenido/Contenido';

import { createStore } from "redux";
import { Provider } from "react-redux";
import { reducer } from './components/reducers/reducer';


const App = () => {

  const store = createStore(reducer);

  // let usuarioLogueado = JSON.parse(sessionStorage.getItem('usuario'));

  // const [isLogin, setIsLogin] = useState(false);	 //Para el login

  // if(!isLogin){ //Verificamos que el usuario no este logueado, si no lo esta, lo redirigimos al login
  //   return (
  //     <div className="App">
  //       <Header></Header>
  //         <IngresoRegistro></IngresoRegistro>
  //       <Footer></Footer>
  //     </div>
  //   )         
  // }  



  return (
    <div className="App">

        <Provider store={store}>

        <Header></Header>
          <IngresoRegistro></IngresoRegistro>
        <Footer></Footer>

   			</Provider>

    </div>
  );
  


}

export default App;
