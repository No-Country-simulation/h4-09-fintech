import { useEffect } from "react";
import "./Dashboard.css";
import { BellAlertIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
// import profile from "../../assets/foto.jpg";
import BarChartComponent from "./(components)/graficos/barchart/BarChart";
import Example from "./(components)/graficos/Linear/LinearChart";
// import Circular from "./(components)/graficos/Pastel/PieChart";
import { UserIcon } from "@heroicons/react/16/solid";
import { NoteDash } from "./notificaciones/NoteDash";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  // OBJETIVO FINANCIERO
  useEffect(() => {
    // solicitud al backend para obtener objetivo financiero
  }, []);

  {
    /*solicitar estado actual de "PROGRESO HACIA OBJETIVOS" 
    1.verificar si existe un objetivo en el back
    1.1 verificar que el objetivo este iniciado en el back, si no esta iniciado bloquear o finalizar todo el proceso
    2.obtener la cantidad de dinero actual de la cuenta
    3.si existe,calcular progreso hacia objetivo con respecto a la cantidad de dinero ej: 20% del objetivo alcanzado
    4.un vez obtenido el porcentaje ,condicionar para que se lanze una notificacion si toca los porcentajes : 30%, 50% ,90%
    5.si el objetivo esta finalizado ,cancelar o bloquear todo el proceso anterior
    */
  }

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
      <h1 className="titulo-dash">
        Dashboard{" "}
        <Link to="/notificaciones" className="container-bell link-rrdom">
          <div className="counter-notif">2</div>
          <BellAlertIcon className="iconos-hero" />
        </Link>
      </h1>
      {/* 
       condicional para cargar las notificaciones
       */}
      <NoteDash />
      <div className="container-usuario flex ">
        <UserIcon id="foto-perfil" />
        {/* <img src={profile} alt="" id="foto-perfil" /> */}
        <div>
          <h2>¡Hola Carlos!</h2>
          <small className="correo-usuario-dash">correo@gmail.com</small>
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

      {/* <Circular /> */}
    </div>
  );
};
