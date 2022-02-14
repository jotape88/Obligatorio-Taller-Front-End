import React from 'react'
import { combineReducers } from 'redux';
// import reducerIngresoRegistro from './reducerIngresoRegistro';
import reducerDptos from './reducerDptos';
import reducerCategs from './reducerCategs';
import reducerCdsOrig from './reducerCdsOrig';
import reducerCdsDes from './reducerCdsDes';
import reducerEnvios from './reducerEnvios';

const reducer = combineReducers ({ //Para combinar los reducers
  // reducerIngresoRegistro: reducerIngresoRegistro,
  reducerDptos: reducerDptos,
  reducerCategs: reducerCategs,
  reducerCdsOrig: reducerCdsOrig,
  reducerCdsDes: reducerCdsDes,
  reducerEnvios: reducerEnvios
});


export default reducer