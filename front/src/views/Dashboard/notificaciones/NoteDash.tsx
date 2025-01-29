import { Link } from "react-router-dom";
import "./NoteDash.css";
import { XMarkIcon } from "@heroicons/react/16/solid";
import logo from "../../../assets/icons/(iupi)/Logo iupi 14px.svg";
import { useRef } from "react";

export const NoteDash = () => {
  const boxNoteDash = useRef<HTMLDivElement | null>(null); // Definir el tipo correctamente

  const cerrarNotificacion = () => {
    if (boxNoteDash.current) {
      boxNoteDash.current.style.display = "none";

      setTimeout(() => {
        if (boxNoteDash.current) {
          boxNoteDash.current.style.display = "flex";
        }
      }, 3_000_000); // Puedes usar guion bajo para mejorar la legibilidad del número
    }
  };

  return (
    <div className="container-notificacion" ref={boxNoteDash}>
      <img src={logo} className="logo-notificaciones" />
      <Link to="/notificaciones" className="info-notes">
        <h5>Progreso en tus alertas de inversión</h5>
        <p>
          Has activado 3 de 5 alertas recomendadas para tus inversiones. | Hace
          29min
        </p>
      </Link>
      <XMarkIcon className="cerrar-not-btn" onClick={cerrarNotificacion} />
    </div>
  );
};
