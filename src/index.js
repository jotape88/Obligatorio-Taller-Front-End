import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import './index.css';
import './styles/estilos.css';

import reportWebVitals from './reportWebVitals';
import App from './App';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';


ReactDOM.render(
  <React.StrictMode>

    <App />
    
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
