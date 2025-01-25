import { useEffect } from "react";
import "./Dashboard.css";
import { BellAlertIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import BarChartComponent from "./(components)/graficos/barchart/BarChart";
import Example from "./(components)/graficos/Linear/LinearChart";
import Circular from "./(components)/graficos/Pastel/PieChart";
import { UserIcon } from "@heroicons/react/16/solid";
import { NoteDash } from "./notificaciones/NoteDash";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

export const Dashboard = () => {
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading) {
      console.log("Usuario cargado:", user);
    }
  }, [loading, user]);
  useEffect(() => {
    fetch(`https://h4-09-fintech-production.up.railway.app/api/cedears`, {
      method: "GET",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwic3ViIjoiYm1AbWFpbC5jb20iLCJpYXQiOjE3Mzc3NjUxNDMsImV4cCI6MTczNzc2ODc0M30.tpMTDzzH5vE1jtr87q2yF0XZ76OGRy_X3BW0BLy5zIo`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);
  const data = [
    { name: "Casa", ventas: 50 },
    { name: "Auto", ventas: 20 },
    { name: "Viaje", ventas: 3 },
    { name: "Jubilación", ventas: 75 },
    { name: "Educación", ventas: 100 },
  ];

  if (loading) {
    return <div>Cargando datos del usuario...</div>;
  }

  return (
    <div className="dashboard">
      <h1 className="titulo-dash">
        Dashboard{" "}
        <Link to="/notificaciones" className="container-bell link-rrdom">
          <div className="counter-notif">2</div>
          <BellAlertIcon className="iconos-hero" />
        </Link>
      </h1>
      <NoteDash />
      <div className="container-usuario flex">
        <UserIcon id="foto-perfil" />
        <div>
          <h2>¡Hola {user?.name || "Usuario"}!</h2>
          <small className="correo-usuario-dash">{user?.email}</small>
        </div>
        <small className="free-plan">Free plan</small>
      </div>

      <div className="añadir-tarjeta flex">
        <div>
          <PlusCircleIcon className="cruz-icon" />
        </div>
        Añadir tarjeta de crédito
      </div>

      <BarChartComponent data={data} dataKey="ventas" xAxisKey="name" />
      <Example />
      <Circular />
    </div>
  );
};
