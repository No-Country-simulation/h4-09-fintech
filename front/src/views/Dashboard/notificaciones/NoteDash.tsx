import { Link } from "react-router-dom";
import "./NoteDash.css";
import { XMarkIcon } from "@heroicons/react/16/solid";
import logo from "../../../assets/icons/(iupi)/Logo iupi 14px.svg";
import { useEffect, useRef, useState } from "react";

// Definir la interfaz para las notificaciones
interface Notificacion {
  id: string;
  title: string;
  message: string;
}

// Definir el tipo para el estado notify
interface NotifyState {
  titulo: string;
  mensaje: string;
}

// Definir las props del componente
interface NoteDashProps {
  notificaciones: Notificacion[];
}

// Componente NoteDash
export const NoteDash: React.FC<NoteDashProps> = ({ notificaciones }) => {
  const [notify, setNotify] = useState<NotifyState>({
    titulo: "Notificaciones",
    mensaje: "Haz click aquí para visualizar o configurar tus notificaciones",
  });

  const boxNoteDash = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const notifiesArray = notificaciones;
    const randomIndex = Math.floor(Math.random() * notifiesArray.length);
    const notificacionRandom = notifiesArray[randomIndex];

    if (!notificacionRandom) {
      setNotify({
        titulo: "Notificaciones",
        mensaje:
          "Haz click aquí para visualizar o configurar tus notificaciones",
      });
    } else {
      // Mapear las propiedades de Notificacion a NotifyState
      setNotify({
        titulo: notificacionRandom.title,
        mensaje: notificacionRandom.message,
      });
    }
  }, [notificaciones]);

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
    <>
      <div className="container-notificacion" ref={boxNoteDash}>
        <img src={logo} className="logo-notificaciones" alt="Logo IUPI" />
        <Link to="/notificaciones" className="info-notes">
          <h5>{notify.titulo}</h5>
          <p>{notify.mensaje}</p>
        </Link>
        <XMarkIcon className="cerrar-not-btn" onClick={cerrarNotificacion} />
      </div>
    </>
  );
};
