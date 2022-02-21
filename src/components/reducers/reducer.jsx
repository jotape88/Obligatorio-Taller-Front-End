import { combineReducers } from 'redux';
import reducerDptos from './reducerDptos';
import reducerCategs from './reducerCategs';
import reducerEnvios from './reducerEnvios';
import reducerCiudades from './reducerCiudades';

const reducer = combineReducers ({ 
  reducerDptos: reducerDptos,
  reducerCategs: reducerCategs,
  reducerEnvios: reducerEnvios,
  reducerCiudades: reducerCiudades,
});

export default reducer