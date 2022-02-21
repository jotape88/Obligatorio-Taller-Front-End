import { combineReducers } from 'redux';
import reducerDptos from './reducerDptos';
import reducerCategs from './reducerCategs';
import reducerCdsOrig from './reducerCdsOrig';
import reducerCdsDes from './reducerCdsDes';
import reducerEnvios from './reducerEnvios';
import reducerCiudades from './reducerCiudades';

const reducer = combineReducers ({ 
  reducerDptos: reducerDptos,
  reducerCategs: reducerCategs,
  reducerCdsOrig: reducerCdsOrig,
  reducerCdsDes: reducerCdsDes,
  reducerEnvios: reducerEnvios,
  reducerCiudades: reducerCiudades,
});

export default reducer