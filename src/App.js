import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react'
import Header from './components/Header/Header';
import IngresoRegistro from './components/IngresoRegistro/IngresoRegistro';
import Footer from './components/Footer/Footer';
import Contenido from './components/Contenido/Contenido';
import Dashboard from './components/Dashboard/Dashboard';
import NotFound from './components/Contenido/NotFoundPage';
import Logout from './components/Contenido/Logout';

import { BrowserRouter, Routes, Route} from "react-router-dom";

import { createStore } from "redux";
import { Provider, useSelector } from "react-redux";
import  reducer from './components/reducers/reducer';


const App = () => {

  


  const [isLogin, setIsLogin] = useState(false);	 //Para el login

  //let usuarioLogeado = useSelector((state) => state.reducerIngresoRegistro); 
  let usuarioLogeado = JSON.parse(sessionStorage.getItem('usuario'));

  // useEffect(() => {
  //   console.log(`useEffect ON:`, usuarioLogeado); //Cuando cambia contador1, se ejecuta el useEffect
  // }, []);
 

  // if(usuarioLogeado){
  //   setIsLogin(true);
  // }

  // useEffect(() => {
  //   setInterval(() => console.log(`contador`, contador), 1000);
  // }, []);
 

  // if(!isLogin){ //Verificamos que el usuario no este logueado, si no lo esta, lo redirigimos al login
  //   return (
  //     <div className="App">
  //       <Provider store={store}>
  //         <Header></Header>
  //           <IngresoRegistro></IngresoRegistro>
  //         <Footer></Footer>
  //       </Provider>
  //     </div>
  //   )         
  // } else {
    return (
      <div className="App container-fluid">
        <BrowserRouter>
          <Routes>
      
            <Route path="/Login" element={ <IngresoRegistro/> } />
            {/* <Route path="/Logout" element={ <Logout/> } /> */}
            <Route path="/Dashboard" element={ <Dashboard/> } />
            <Route path="*" element={ <NotFound/> } />
              {/* <Header></Header>
                <IngresoRegistro></IngresoRegistro>}
                <Dashboard></Dashboard>}
              <Footer></Footer> */}
           
          </Routes>
        </BrowserRouter>
      </div>
    )
  


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
