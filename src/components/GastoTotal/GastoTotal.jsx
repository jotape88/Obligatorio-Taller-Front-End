import { useSelector } from "react-redux";

const ListaEnvios = () => {
    //#region Variables y Hooks
    const reduceEnvios = useSelector((state) => state.reducerEnvios);
    
    //#region Metodos
    const calcularTotalDeEnvios = () => {
        let costoTotal = 0
        reduceEnvios.forEach(envio => {
            costoTotal += envio.precio;
        });
        return costoTotal;
    }
    //#endregion

    //#region Renderizado
    return (
        <div id="gastoTotal" className='justify-content-end text-end'>        
            <h5>Total gastado</h5>
            <span>$ {calcularTotalDeEnvios()} </span>
        </div>
    )
    //#endregion
}

export default ListaEnvios