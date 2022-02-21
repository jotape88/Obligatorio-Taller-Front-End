const estadoInicial = [];

const reducerCiudades = (state = estadoInicial, action) => {
    switch (action.type) {
        case 'CargarCiudades':
                return action.payload;
        case 'CargarCiudadesOrigen':
                return action.payload;
        case 'CargarCiudadesDestino':
                return action.payload;
        default:
            return state;
    }
};

export default reducerCiudades;