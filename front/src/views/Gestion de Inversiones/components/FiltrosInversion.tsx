import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import "./FiltrosInversion.css";
import { Link, NavLink, Outlet } from "react-router-dom";
export const FiltrosInversion = () => {
  return (
    <div className="container-filtros-inversion">
      <h1>
        <Link to="/gestion">
          {" "}
          <ArrowLeftIcon className="iconos-hero" />
        </Link>{" "}
        Filtros de inversión
      </h1>
      <div className="container-btns">
        <div className="uno">
          <NavLink to="todos" className="todos">
            Todos
          </NavLink>
          <NavLink to="nivel-riesgo" className="riesgo">
            Nivel de riesgo
          </NavLink>
          <NavLink to="categorias" className="categorias">
            Categorias
          </NavLink>
        </div>
        <div className="dos">
          <NavLink to="horizonte-temporal" className="horizonte">
            Horizonte temporal
          </NavLink>
          <NavLink to="rendimiento-historico" className="rendimiento">
            Rendimiento histórico
          </NavLink>
        </div>
      </div>
      <hr />
      <Outlet />
    </div>
  );
};
