import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react'
import Header from './components/Header/Header';
import IngresoRegistro from './components/IngresoRegistro/IngresoRegistro';
import Footer from './components/Footer/Footer';
import Contenido from './components/Contenido/Contenido';
import Dashboard from './components/Dashboard/Dashboard';

// import { BrowserRouter, Routes, Route} from "react-router-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";
import  reducer from './components/reducers/reducer';


const App = () => {

  const store = createStore(reducer);

  // let usuarioLogueado = JSON.parse(sessionStorage.getItem('usuario'));

  const [isLogin, setIsLogin] = useState(false);	 //Para el login

  if(!isLogin){ //Verificamos que el usuario no este logueado, si no lo esta, lo redirigimos al login
    return (
      <div className="App">
        <Provider store={store}>
          <Header></Header>
            <IngresoRegistro></IngresoRegistro>
          <Footer></Footer>
        </Provider>
      </div>
    )         
  } else {
    return (
      <div className="App">
        <Provider store={store}>
          <Header></Header>
            <Dashboard></Dashboard>
          <Footer></Footer>
        </Provider>
      </div>
    )
  }


  // return (
  //   <div className="App">

  //       <Provider store={store}>

  //       <Header></Header>
  //         <IngresoRegistro></IngresoRegistro>
  //         <Dashboard></Dashboard>
  //       <Footer></Footer>

  //  			</Provider>
  //</div>
      {/* <BrowserRouter>
        <Routes>
          <Route path='/IngresoRegistro/IngresoRegistro' element={<IngresoRegistro/>} />
          <Route path='/Dashboard/Dashboard' element={<Dashboard/>} />
          <Route component={IngresoRegistro}></Route>
        </Routes>
      </BrowserRouter> */}
    
  //);
  


}

export default App;
