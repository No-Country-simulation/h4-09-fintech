import { useEffect } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  // OBJETIVO FINANCIERO
  useEffect(() => {
    //solicitud al backend para obtener objetivo financiero
  }, []);
  return (
    <div className="dashboard">
      <div className="dash-item">
        <Link to="/cuenta">Configuracion de cuenta</Link>
      </div>

      <div className="dash-item">Progeso hacia objetivos</div>
      <div className="dash-item">Resumen de gastos</div>
      <div className="dash-item">
        <Link to="/gestion">Gestión</Link>
      </div>
      <div className="dash-item">incrementar/explorar</div>
      <div className="dash-item">
        <Link to="/objetivos">objetivos financieros</Link>{" "}
      </div>
      <div className="dash-item">
        <Link to="/inversiones">Inversiones</Link>{" "}
      </div>
    </div>
  );
};
