import React from 'react'
import { combineReducers } from 'redux';
import reducerIngresoRegistro from './reducerIngresoRegistro';
import reducerDptos from './reducerDptos';

const reducer = combineReducers ({ //Para combinar los reducers
  reducerIngresoRegistro: reducerIngresoRegistro,
  reducerDptos: reducerDptos
  
})



export default reducer