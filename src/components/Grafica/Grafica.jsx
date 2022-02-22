import React from "react";
import Chart from "react-apexcharts";

const Grafica = ({ datos, categorias, nombreSeries = "" }) => {
    const state = {
      options: {
        chart: {
          id: "apexchart-example",
        },
        xaxis: {
          categories: categorias,
        },
      },
      series: [
        {
          name: nombreSeries,
          data: datos,
        },
      ],
    };
  
    return (
      {/* alineamos la chart con bootstrap, dandole display flex */},
      <Chart className="d-flex justify-content-center" 
        options={state.options}
        series={state.series}
        type="bar"
        width={500}
        height={320}
      />
    );
  };

export default Grafica