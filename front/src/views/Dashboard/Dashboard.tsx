import { useEffect } from "react";
import "./Dashboard.css";
import { BellAlertIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
// import profile from "../../assets/foto.jpg";
import BarChartComponent from "./(components)/graficos/barchart/BarChart";
import Example from "./(components)/graficos/Linear/LinearChart";
import Circular from "./(components)/graficos/Pastel/PieChart";
import { UserIcon } from "@heroicons/react/16/solid";

export const Dashboard = () => {
  // OBJETIVO FINANCIERO
  useEffect(() => {
    // solicitud al backend para obtener objetivo financiero
  }, []);

  // Datos para el gráfico de barras
  const data = [
    { name: "Casa", ventas: 50 },
    { name: "Auto", ventas: 20 },
    { name: "Viaje", ventas: 8 },
    { name: "Jubilación", ventas: 100 },
    { name: "Educación", ventas: 180 },
  ];

  return (
    <div className="dashboard">
      <h1 className="px-2 titulo-dash">
        Dashboard <BellAlertIcon className="iconos-hero" />
      </h1>
      <div className="container-usuario flex px-2">
        <UserIcon id="foto-perfil" />
        {/* <img src={profile} alt="" id="foto-perfil" /> */}
        <div>
          <h2 className="fuente-azul">¡Hola Carlos!</h2>
          <small>correo@gmail.com</small>
        </div>
        <small className="free-plan">Free plan</small>
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

      <BarChartComponent
        data={data}
        dataKey="ventas" // Asegurarse de pasar el `dataKey` adecuado
        xAxisKey="name" // Asegurarse de pasar el `xAxisKey` adecuado
      />

      <Example />

      <Circular />
    </div>
  );
};
