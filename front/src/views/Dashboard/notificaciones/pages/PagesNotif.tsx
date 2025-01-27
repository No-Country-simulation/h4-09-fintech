import { TrashIcon } from "@heroicons/react/24/outline";
import "./PagesNotif.css";
import { Link } from "react-router-dom";
import logo from "../../../../assets/icons/(iupi)/Logo iupi 14px.svg";

// Componente para Todo
export const Todo = () => {
  return (
    <section className="container-page-notif">
      <Link to="/alertas-inversion" className="link-alertas-inversion">
        <article className="notificacion">
          <img src={logo} className="logo-notificaciones" />
          <div className="container-info-notif">
            <h1>¡Excelente, estas apunto de alcanzar tu objetivo!</h1>
            <p>
              Has alcanzado el 40% de tu meta para el fondo de inversión a largo
              plazo.
            </p>
          </div>
          <TrashIcon className="iconos-hero trash-icon-notif" />
        </article>
      </Link>
    </section>
  );
};

// Componente para Objetivos
export const ObjetivosNotif = () => {
  return (
    <section className="container-page-notif">
      <Link to="/alertas-inversion" className="link-alertas-inversion">
        <article className="notificacion">
          <img src={logo} className="logo-notificaciones" />
          <div className="container-info-notif">
            <h1>¡Excelente, estas apunto de alcanzar tu objetivo!</h1>
            <p>
              Has alcanzado el 40% de tu meta para el fondo de inversión a largo
              plazo.
            </p>
          </div>
          <TrashIcon className="iconos-hero trash-icon-notif" />
        </article>
      </Link>
    </section>
  );
};

// Componente para Recordatorios
export const Recordatorios = () => {
  return (
    <section className="container-page-notif">
      <Link to="/alertas-inversion" className="link-alertas-inversion">
        <article className="notificacion">
          <img src={logo} className="logo-notificaciones" />
          <div className="container-info-notif">
            <h1>¡Excelente, estas apunto de alcanzar tu objetivo!</h1>
            <p>
              Has alcanzado el 40% de tu meta para el fondo de inversión a largo
              plazo.
            </p>
          </div>
          <TrashIcon className="iconos-hero trash-icon-notif" />
        </article>
      </Link>
    </section>
  );
};
