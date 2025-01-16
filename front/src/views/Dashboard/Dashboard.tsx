import { useEffect } from "react";
import "./Dashboard.css";
import { BellAlertIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import profile from "../../assets/foto.jpg";
import BarChartComponent from "./(components)/graficos/barchart/BarChart";
import Example from "./(components)/graficos/Linear/LinearChart";
import Circular from "./(components)/graficos/Pastel/PieChart";

export const Dashboard = () => {
  // OBJETIVO FINANCIERO
  useEffect(() => {
    // solicitud al backend para obtener objetivo financiero
  }, []);

  // Datos para el gráfico de barras
  const data = [
    { name: "Casa", ventas: 10 },
    { name: "Auto", ventas: 10 },
    { name: "Viaje", ventas: 50 },
    { name: "Jubilación", ventas: 100 },
    { name: "Educación", ventas: 180 },
  ];

  return (
    <div className="dashboard">
      <h1 className="px-2">
        Dashboard <BellAlertIcon className="iconos-hero" />
      </h1>
      <div className="container-usuario flex px-2">
        <img src={profile} alt="" id="foto-perfil" />
        <div>
          <h2 className="fuente-azul">¡Hola Carlos!</h2>
          <small>correo@gmail.com</small>
        </div>
        <b>Free plan</b>
      </div>
      {/* <div
        style={{
          height: "5.28vh",
          margin: "0 2vw",
          border: "solid grey 1px",
          borderRadius: "10px",
        }}
      >
        Buscador (cambiar)
      </div> */}
      <div className="añadir-tarjeta flex">
        <div>
          <PlusCircleIcon className="cruz-icon" />
        </div>
        Añadir tarjeta de crédito
      </div>
      <section
        style={{
          height: "19.5vh",
          margin: "0 2vw",
        }}
      >
        <BarChartComponent
          data={data}
          dataKey="ventas" // Asegúrate de pasar el `dataKey` adecuado
          xAxisKey="name" // Asegúrate de pasar el `xAxisKey` adecuado
        />
      </section>
      <section
        style={{
          height: "23.17vh",
          margin: "0 2vw",
        }}
      >
        <Example />
      </section>

      <Circular />
    </div>
  );
};
