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
      <div className="dash-item">Progeso hacia objetivos</div>
      <div className="dash-item">Resumen de gastos</div>
      <div className="dash-item">
        <Link to="/gestion">
          <button>Gestión</button>
        </Link>
      </div>
      <div className="dash-item">incrementar/explorar</div>
      <div className="dash-item">
        <Link to="/objetivos">
          <button>objetivos financieros</button>
        </Link>{" "}
      </div>
    </div>
  );
};
