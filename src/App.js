import React from 'react'
import './App.css';
import IngresoRegistro from './components/IngresoRegistro/IngresoRegistro';
import Footer from './components/Footer/Footer';
import Dashboard from './components/Dashboard/Dashboard';
import NotFound from './components/Contenido/NotFoundPage';
import Home from './components/Contenido/Home';
import ListaTopDptos from './components/ListaTopDptos/ListaTopDptos';
import Header from './components/Header/Header';

import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";

import FormularioEnvio from './components/FormularioEnvio/FormularioEnvio';
import ListaEnvios from './components/ListaEnvios/ListaEnvios';
import GraficoEnvXCiudad from './components/GraficoEnvXCiudad/GraficoEnvXCiudad';
import GraficoEnvXCateg from './components/GraficoEnvXCateg/GraficoEnvXCateg';


const App = () => {

    return (
      <Container fluid>          
        <Row className='text-center'>             
          <Col>   
          <Header/>         
            <BrowserRouter>         
              <Routes>             
                  <Route path="*" element={ <NotFound/> } /> {/* Error de 404 para cuando no se encuentra la url digitada */}
                  <Route path="/login" element={ <IngresoRegistro/> } /> 
                  <Route path="/" element={ <Dashboard /> }>
                      <Route index element={ <Home />} /> {/* La ruta por defecto cuando iniciamos la aplicacion va a ser el componente <Home> */}
                      <Route path="formEnvios" element={ <FormularioEnvio/> } />
                      <Route path="listEnvios" element={ <ListaEnvios/> } />
                      <Route path="topEnvios" element={ <ListaTopDptos/> } />
                      <Route path="grafEnvXCiud" element={ <GraficoEnvXCiudad/> } />
                      <Route path="grafEnvXCateg" element={ <GraficoEnvXCateg/> } />                     
                     </Route>                          
              </Routes>
            </BrowserRouter>
            <Footer/>
          </Col>
        </Row>
      </Container>
    )
}

export default App;
