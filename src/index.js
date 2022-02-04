import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

import './index.css';
import './estilos.css';

import reportWebVitals from './reportWebVitals';
import App from './App';
import Header from './components/Header';
import Footer from './components/Footer';

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <App />
    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
