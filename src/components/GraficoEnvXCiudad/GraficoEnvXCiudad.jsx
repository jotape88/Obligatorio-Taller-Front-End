import React from 'react'
import { useSelector } from "react-redux";
import Grafica from "../Grafica/Grafica";

const GraficoEnvXCiudad = () => {

  const reduceEnvios = useSelector((state) => state.reducerEnvios);
  const reduceCiudades = useSelector((state) => state.reducerCiudades);

  const obtenerOrdenados = () => {

      const mapaEnvios = new Map(); // Mapa de envios

      reduceEnvios.forEach(e => {
          const ciudadDesIdEnvio = e.ciudad_destino; // Obtenemos la id de la categoria del envio
          const nombreCiudadDestino = reduceCiudades.find(c => c.id == ciudadDesIdEnvio).nombre; // Obtenemos el nombre de la categoria
          if (!mapaEnvios.has(nombreCiudadDestino)) { // Si no existe la categoria en el mapa
              mapaEnvios.set(nombreCiudadDestino, 0); // Creamos una entrada en el mapa y le asignamos el valor 0
          }

          let cantidad = mapaEnvios.get(nombreCiudadDestino); // Obtenemos la cantidad de envios de la categoria
          ++cantidad; // Incrementamos la cantidad
          mapaEnvios.set(nombreCiudadDestino, cantidad);  // Actualizamos la cantidad
          
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
        <p className="titulosGraficas">{"Envíos por ciudades"}</p>
        <Grafica {...data}></Grafica>
    </div>
  );
};

export default GraficoEnvXCiudad