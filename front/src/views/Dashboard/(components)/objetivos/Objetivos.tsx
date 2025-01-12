import { Link } from "react-router-dom";
import "./Objetivos.css";
export const Objetivos = () => {
  // a la espera del backend----------------------
  const objetivosFinancieros = [
    { id: 1, nombre: "Ahorro para vacaciones" },
    { id: 2, nombre: "Fondo de emergencia" },
    { id: 3, nombre: "Compra de coche" },
    { id: 4, nombre: "Pago de deudas" },
    { id: 5, nombre: "Compra de casa" },
    { id: 6, nombre: "Fondo para educación" },
    { id: 7, nombre: "Invertir en acciones" },
    { id: 8, nombre: "Fondo para retiro" },
    { id: 9, nombre: "Renovación del hogar" },
    { id: 10, nombre: "Iniciar un negocio" },
  ];
  //-----------------------------------------------

  return (
    <div>
      Mis objetivos:
      <ol>
        {objetivosFinancieros.map((objetivo, index) => (
          <li key={index}>
            <Link to={`/objetivo/${objetivo.nombre}`}>{objetivo.nombre}</Link>
          </li>
        ))}
      </ol>
      <Link to="/dashboard">dashboard</Link>
    </div>
  );
};
