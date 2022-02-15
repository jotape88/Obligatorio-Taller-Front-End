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
import { Provider } from "react-redux";
import { createStore } from "redux";
import  reducer from './components/reducers/reducer';

const store = createStore(reducer);

ReactDOM.render(

  <React.StrictMode>

    <Provider store={store}>
      <Header/>
      <App />
      <Footer/>
    </Provider>

  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
