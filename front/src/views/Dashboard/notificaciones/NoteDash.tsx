import { Link } from "react-router-dom";
import "./NoteDash.css";
import { XMarkIcon } from "@heroicons/react/16/solid";

export const NoteDash = () => {
  return (
    <div className="container-notificacion">
      <div className="iupi-notes">iupi</div>
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
