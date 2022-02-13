import React from 'react'
import { combineReducers } from 'redux';
// import reducerIngresoRegistro from './reducerIngresoRegistro';
import reducerDptos from './reducerDptos';
import reducerCategs from './reducerCategs';
import reducerCiudades from './reducerCiudades';

const reducer = combineReducers ({ //Para combinar los reducers
  // reducerIngresoRegistro: reducerIngresoRegistro,
  reducerDptos: reducerDptos,
  reducerCategs: reducerCategs,
  reducerCiudades: reducerCiudades
});


export default reducer