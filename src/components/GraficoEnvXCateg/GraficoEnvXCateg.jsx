import React from "react";
import Grafica from "../Grafica/Grafica";
import { useSelector } from "react-redux";

const GraficoEnvXCateg = () => {
    const reduceEnvios = useSelector((state) => state.reducerEnvios);
    const reduceCategorias = useSelector((state) => state.reducerCategs);
  
    const obtenerOrdenados = () => {

        const mapaEnvios = new Map(); // Mapa de envios

        reduceEnvios.forEach(e => {
            const categoriaIdEnvio = e.id_categoria; // Obtenemos la id de la categoria del envio
            const nombreCategoria = reduceCategorias.find(c => c.id == categoriaIdEnvio).nombre; // Obtenemos el nombre de la categoria
            if (!mapaEnvios.has(nombreCategoria)) { // Si no existe la categoria en el mapa
                mapaEnvios.set(nombreCategoria, 0); // Creamos una entrada en el mapa y le asignamos el valor 0
            }

            let cantidad = mapaEnvios.get(nombreCategoria); // Obtenemos la cantidad de envios de la categoria
            ++cantidad; // Incrementamos la cantidad
            mapaEnvios.set(nombreCategoria, cantidad);  // Actualizamos la cantidad
            
        });

        const mapDesc = new Map(
                [...mapaEnvios.entries()].sort((a, b) => b[1] - a[1]) // Ordenamos el mapa de mayor a menor
        );

      const datos = Array.from(mapDesc.values()); // Obtenemos los valores del mapa
      const categorias = Array.from(mapDesc.keys()); // Obtenemos las categorias del mapa
      return { categorias, datos };
    };
  
    const data = obtenerOrdenados();
  
    return (
      <div>
        <p className="titulosGraficas">{"Envios por categorias"}</p>
            <Grafica {...data}></Grafica>
      </div>
    );
};

export default GraficoEnvXCateg
