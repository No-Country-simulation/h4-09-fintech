import { Link } from "react-router-dom";
import "./NoteDash.css";
import { XMarkIcon } from "@heroicons/react/16/solid";
import logo from "../../../assets/icons/(iupi)/Logo iupi 14px.svg";

export const NoteDash = () => {
  return (
    <div className="container-notificacion">
      <img src={logo} className="logo-notificaciones" />
      <Link to="/notificaciones" className="info-notes">
        <h5>Progreso en tus alertas de inversión</h5>
        <p>
          Has activado 3 de 5 alertas recomendadas para tus inversiones. | Hace
          29min
        </p>
      </Link>
      <XMarkIcon className="cerrar-not-btn" />
    </div>
  );
};
