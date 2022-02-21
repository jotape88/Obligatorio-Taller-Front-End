import { useSelector } from "react-redux";

const ListaEnvios = () => {
    //#region Variables y Hooks
    const reduceEnvios = useSelector((state) => state.reducerEnvios);
    let costoTotal = 0
    //#endregion

    //#region Metodos
    const calcularTotalDeEnvios = () => {
        reduceEnvios.forEach(envio => {
            costoTotal += envio.precio;
        });

    }
    calcularTotalDeEnvios();
    //#endregion
    
    //#region Renderizado
    return (
        <div id="gastoTotal" className='justify-content-end text-end'>
            <h5>Total gastado</h5>
            <span>$ {costoTotal}</span>
        </div>
    )
    //#endregion
}

export default ListaEnvios