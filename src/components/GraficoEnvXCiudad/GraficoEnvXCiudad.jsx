import React from 'react'
import { useSelector } from "react-redux";
import Grafica from "../Grafica/Grafica";

const GraficoEnvXCiudad = () => {

  const reduceEnvios = useSelector((state) => state.reducerEnvios);
  const datos = []

  const obtenerOrdenados = () => {
    const mapaEnvios = new Map();
    reduceEnvios.forEach((t) => {
      let idEnv = t.id;
      if (!mapaEnvios.has(idEnv)) {
        mapaEnvios.set(idEnv, 0);
      }
      if (t.completed) {
        let cantidad = mapaEnvios.get(idEnv);
        ++cantidad;
        mapaEnvios.set(idEnv, cantidad);
      }
    });
    var mapDesc = new Map(
      [...mapaEnvios.entries()].sort((a, b) => b[1] - a[1]) //1 representa la cantidad
    );
    let datos = Array.from(mapDesc.values());
    let envios = Array.from(mapDesc.keys());
    console.log(`datos,categorias`, datos, envios);
    return { envios, datos };
  };

  const data = obtenerOrdenados();

  return (
    <>
      {"ENTO"}
      <Grafica {...data}></Grafica>
    </>
  );
};

export default GraficoEnvXCiudad