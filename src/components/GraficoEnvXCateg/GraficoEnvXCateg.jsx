import React from "react";
import Grafica from "../Grafica/Grafica";
import { useSelector } from "react-redux";

const GraficoEnvXCateg = () => {
  const categorias = ["pendientes", "completas"];
  const tareas = useSelector((state) => state.reduceCategs);
  const completas = tareas.filter((t) => t.completed).length;
  const pendientes = tareas.filter((t) => !t.completed).length;
  const datosCompuestos = [pendientes, completas];
  const data = { datos: datosCompuestos, categorias: categorias };

  return (
    <>
      {"ENTO"}
      <Grafica {...data}></Grafica>
    </>
  );
};

export default GraficoEnvXCateg