import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react'
import IngresoRegistro from './components/IngresoRegistro/IngresoRegistro';
import Footer from './components/Footer/Footer';
import Dashboard from './components/Dashboard/Dashboard';
import NotFound from './components/Contenido/NotFoundPage';
import Home from './components/Contenido/Home';
import ListaTopDptos from './components/ListaTopDptos/ListaTopDptos';

import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Container, Card, Col, Row } from "react-bootstrap";

import { createStore } from "redux";
import { Provider, useSelector } from "react-redux";
import  reducer from './components/reducers/reducer';
import FormularioEnvio from './components/FormularioEnvio/FormularioEnvio';
import ListaEnvios from './components/ListaEnvios/ListaEnvios';
import GastoTotal from './components/GastoTotal/GastoTotal';
import Header from './components/Header/Header';


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
      <Container>      
        <Row className='text-center'>        
          <Col>          
            <BrowserRouter>         
              <Routes>  
               
                  <Route path="/login" element={ <IngresoRegistro/> } />
                  {/* <Route path="/gastoTotal" element={ <GastoTotal /> } /> */}

                  <Route path="/" element={ <Dashboard /> }>
                      <Route index element={ <Home />} /> 
                      <Route path="formEnvios" element={ <FormularioEnvio/> } />
                      <Route path="listEnvios" element={ <ListaEnvios/> } />
                      <Route path="topEnvios" element={ <ListaTopDptos/> } />
                      
                     </Route>
                  
                     <Route path="*" element={ <NotFound/> } />
                  
              </Routes>

            </BrowserRouter>
            <Footer/>
          </Col>
        </Row>
      </Container>
    )
}

export default App;
