import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

import './index.css';
import './styles/estilos.css';

import reportWebVitals from './reportWebVitals';
import App from './App';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import  reducer from './components/reducers/reducer';

const store = createStore(
    reducer, 
    composeWithDevTools(applyMiddleware(logger)));


ReactDOM.render(

  <React.StrictMode>
    
    <Provider store={store}>
    
      <App />
    
    </Provider>

  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
