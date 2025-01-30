import { ArrowLeftIcon, EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import "./Notificaciones.css";
import { Link, NavLink, Outlet } from "react-router-dom";

export const Notificaciones = () => {
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
      <Outlet />
    </div>
  );
};
