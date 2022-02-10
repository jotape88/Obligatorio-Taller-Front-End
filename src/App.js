import logo from './logo.svg';
import './App.css';
import React from 'react'
import Header from './components/Header/Header';
import IngresoRegistro from './components/IngresoRegistro/IngresoRegistro';
import Footer from './components/Footer/Footer';
import Contenido from './components/Contenido/Contenido';


const App = () => {
  return (
    <div className="App">

      <Header></Header>
      <Contenido></Contenido>   
      <Footer></Footer>

    </div>
  );
}

export default App;



// import React from "react";
// const MiComponente = () => {
//  const handleClick = (e) => {  //Recibo como parametro “e” el evento del click anterior
//    console.log(`e`, e.target); //Con .target lo puedo descomponer y ver de donde vino
//  };
//  return (
//    <div>
//  	    <button onClick={handleClick}>Boton</button>
//    </div>
//  );
// };
// export default MiComponente;