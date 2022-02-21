const estadoInicial = [];

const reducerEnvios = (state = estadoInicial, action) => {
    switch (action.type) {
        case 'CargarEnvio':
            return action.payload;
        case 'AgregarEnvio':
            return [...state, action.payload];
        case 'EliminarEnvio':
            return state.filter(envio => envio.id !== action.payload);  
        default:
            return state;
    }

};

export default reducerEnvios;