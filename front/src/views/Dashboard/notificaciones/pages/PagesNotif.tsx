import { TrashIcon } from "@heroicons/react/24/outline";
import "./PagesNotif.css";
import { Link, useOutletContext } from "react-router-dom";
import logo from "../../../../assets/icons/(iupi)/Logo iupi 14px.svg";

// Definir el tipo del contexto
interface NotificacionesContext {
  notifiesList: Notificacion[];
}
export interface Notificacion {
  id: string;
  title: string;
  message: string;
}
// Componente para Todo
export const Todo = () => {
  const { notifiesList } = useOutletContext<NotificacionesContext>();

  return (
    <section className="container-page-notif">
      {notifiesList.map((notificacion) => (
        <Link
          to="/alertas-inversion"
          className="link-alertas-inversion"
          key={notificacion.id}
        >
          <article className="notificacion">
            <img src={logo} className="logo-notificaciones" alt="Logo IUPI" />
            <div className="container-info-notif">
              <h1>{notificacion.title}</h1>
              <p>{notificacion.message}</p>
            </div>
            <TrashIcon className="iconos-hero trash-icon-notif" />
          </article>
        </Link>
      ))}
    </section>
  );
};

// Componente para Objetivos
export const ObjetivosNotif = () => {
  const { notifiesList } = useOutletContext<NotificacionesContext>();

  return (
    <section className="container-page-notif">
      {notifiesList.map((notificacion) => (
        <Link
          to="/alertas-inversion"
          className="link-alertas-inversion"
          key={notificacion.id}
        >
          <article className="notificacion">
            <img src={logo} className="logo-notificaciones" alt="Logo IUPI" />
            <div className="container-info-notif">
              <h1>{notificacion.title}</h1>
              <p>{notificacion.message}</p>
            </div>
            <TrashIcon className="iconos-hero trash-icon-notif" />
          </article>
        </Link>
      ))}
    </section>
  );
};

// Componente para Recordatorios
export const Recordatorios = () => {
  return (
    <section className="container-page-notif">
      <Link to="/alertas-inversion" className="link-alertas-inversion">
        <article className="notificacion">
          <img src={logo} className="logo-notificaciones" alt="Logo IUPI" />
          <div className="container-info-notif">
            <h1>¡Excelente, estás a punto de alcanzar tu objetivo!</h1>
            <p>
              Has alcanzado el 40% de tu meta para el fondo de inversión a largo
              plazo.
            </p>
          </div>
          <TrashIcon className="iconos-hero trash-icon-notif" />
        </article>
      </Link>
      <Link to="/alertas-inversion" className="link-alertas-inversion">
        <article className="notificacion">
          <img src={logo} className="logo-notificaciones" alt="Logo IUPI" />
          <div className="container-info-notif">
            <h1>¡No olvides revisar tus inversiones!</h1>
            <p>
              Te recomendamos revisar el estado de tus fondos para mantener un
              control adecuado.
            </p>
          </div>
          <TrashIcon className="iconos-hero trash-icon-notif" />
        </article>
      </Link>
    </section>
  );
};
