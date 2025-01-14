import { useEffect } from "react";
import "./Dashboard.css";
import {
  ArrowTrendingUpIcon,
  BellAlertIcon,
  PlusCircleIcon,
  Squares2X2Icon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import profile from "../../assets/foto.jpg";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

export const Dashboard = () => {
  // OBJETIVO FINANCIERO
  useEffect(() => {
    //solicitud al backend para obtener objetivo financiero
  }, []);
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
      <div
        style={{
          height: "5.28vh",
          margin: "0 2vw",
          border: "solid grey 1px",
          borderRadius: "10px",
        }}
      >
        Buscador (cambiar)
      </div>
      <div className="añadir-tarjeta flex">
        <div>
          <PlusCircleIcon className="cruz-icon" />
        </div>
        Añadir tarjeta de crédito
      </div>
      <section
        style={{
          height: "29.38vh",
          margin: "0 2vw",
          border: "solid grey 1px",
          borderRadius: "10px",
        }}
      >
        Objetivos financieros (cambiar)
      </section>
      <section
        style={{
          height: "34.38vh",
          margin: "0 2vw",
          border: "solid grey 1px",
          borderRadius: "10px",
        }}
      >
        Balance general (cambiar)
      </section>
      <section
        style={{
          height: "27.14vh",
          margin: "0 2vw",
          border: "solid grey 1px",
          borderRadius: "10px",
        }}
      >
        Incrementa tus ahorros (cambiar)
      </section>

      {/*

      <div className="dash-item">Progeso hacia objetivos</div>
      <div className="dash-item">Resumen de gastos</div>
      
      <div className="dash-item">incrementar/explorar</div>
      <div className="dash-item">
        <Link to="/objetivos">objetivos financieros</Link>{" "}
      </div>
      <div className="dash-item">
        <Link to="/inversiones">Inversiones</Link>{" "}
      </div> */}
    </div>
  );
};
