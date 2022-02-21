const estadoInicial = "";

const reducerCdsDes = (state = estadoInicial, action) => {
    switch (action.type) {
        case 'CargarCiudadesDestino':
                return action.payload;
        default:
            return state;
    }
};

export default reducerCdsDes;