import { ArrowLeftIcon, EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import "./Notificaciones.css";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
// Definir la interfaz para las notificaciones
interface Notificacion {
  id: string;
  title: string;
  message: string;
}
export const Notificaciones = () => {
  const [notifiesList, setNotifiesList] = useState<Notificacion[]>([]);

  // Obtener el token de las cookies
  const getCookie = (name: string): string | null => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((row) => row.startsWith(`${name}=`));
    return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
  };
  //Solicitud para todas las notificaciones
  useEffect(() => {
    const token = getCookie("authToken");
    const fetchNotifies = async () => {
      try {
        const res = await fetch(
          `https://h4-09-fintech-production.up.railway.app/api/notifications/all`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) throw new Error("Error al obtener las notificaciones.");
        const data = await res.json();
        console.log(data);

        setNotifiesList(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotifies();
  }, []);
  return (
    <div className="container-notificaciones">
      <h1>
        <Link to="/dashboard" className="link-rrdom">
          <ArrowLeftIcon className="iconos-hero flecha-izquierda arrow-prev-adjust" />
        </Link>
        Notificaciones
        <EllipsisVerticalIcon className="iconos-hero puntitos" />
      </h1>
      <nav className="notif-navbar">
        <NavLink to="todo">Todo</NavLink>
        <NavLink to="objetivos-notif">Objetivos</NavLink>
        <NavLink to="recordatorios">Recordatorios</NavLink>
      </nav>
      {/* Pasamos notifiesList a los componentes hijos */}
      <Outlet context={{ notifiesList }} />{" "}
    </div>
  );
};
