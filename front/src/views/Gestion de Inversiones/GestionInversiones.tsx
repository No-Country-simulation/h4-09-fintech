import {
  AdjustmentsHorizontalIcon,
  ArrowTrendingUpIcon,
  EyeIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import mastercard from "../../assets/svg/MASTERCARD.svg";
import "./GestionInversiones.css";
import { Link } from "react-router-dom";

export const GestionInversiones = () => {
  return (
    <div className="container-gestion-inversiones">
      <h1>Gestión de inversiones</h1>
      <div className="grid-container-gestion box-section-standart">
        <h6 className="ojo">
          Saldo disponible
          <EyeIcon className="iconos-hero" />
        </h6>
        <div className="saldo">
          <span>$9,814.68</span>
          <small>Saldo estimado $10,424.00</small>
          <div>
            TNA
            <b>40%</b>
          </div>
        </div>
        <div className="tarjeta">
          <img src={mastercard} className="martercard" />
          <span>12345678</span>
        </div>
        <div className="agregar">
          <PlusCircleIcon className="cruz-icon" />
        </div>
      </div>
      <h4>
        ¿En que desea invertir?{" "}
        <Link to="/filtros-inversion">
          <AdjustmentsHorizontalIcon className="iconos-hero" />
        </Link>
      </h4>
      <p>Invertí de manera fácil y rápida en el mercado.</p>
      <div className="inversiones-btn-group">
        <Link to="">Acciones</Link>
        <Link to="">Bonos</Link>
        <Link to="">ETFs</Link>
        <Link to="">Fondos</Link>
        <Link to="">Metales preciosos</Link>
      </div>
      <h5>Añadidos recientemente</h5>
      <section className="container-mercado">
        {/* desde aqui generar map de empresas */}
        <div className="empresa box-section-standart">
          <img src="" alt="Mercado Libre" />
          <div className="nombre">
            <h5>
              Mercado libre | <small>5 acciones</small>
            </h5>
            <div className="accion">
              <div>ARS</div>
              <span>$9,499,10</span>
            </div>
          </div>
          <div className="mercado">
            <small>Arriesgado</small>
            <div className="porcentajes">
              <ArrowTrendingUpIcon className="iconos-hero flecha-trending" />
              <span className="subida">+6.25%</span>
              <span className="bajada">-0.62%</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
