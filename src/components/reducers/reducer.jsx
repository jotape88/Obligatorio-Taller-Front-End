import React from 'react'
import { combineReducers } from 'redux';
// import reducerIngresoRegistro from './reducerIngresoRegistro';
import reducerDptos from './reducerDptos';
import reducerCategs from './reducerCategs';

const reducer = combineReducers ({ //Para combinar los reducers
  // reducerIngresoRegistro: reducerIngresoRegistro,
  reducerDptos: reducerDptos,
  reducerCategs: reducerCategs
});


export default reducer