import React from 'react'
import { combineReducers } from 'redux';
// import reducerIngresoRegistro from './reducerIngresoRegistro';
import reducerDptos from './reducerDptos';
import reducerCategs from './reducerCategs';
import reducerCdsOrig from './reducerCdsOrig';
import reducerCdsDes from './reducerCdsDes';

const reducer = combineReducers ({ //Para combinar los reducers
  // reducerIngresoRegistro: reducerIngresoRegistro,
  reducerDptos: reducerDptos,
  reducerCategs: reducerCategs,
  reducerCdsOrig: reducerCdsOrig,
  reducerCdsDes: reducerCdsDes
});


export default reducer