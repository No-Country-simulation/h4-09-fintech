import {
  AdjustmentsHorizontalIcon,
  ArrowTrendingUpIcon,
  EyeIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import mastercard from "../../assets/svg/MASTERCARD.svg";
import "./GestionInversiones.css";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseUrl } from "../../config/envs";

// Definición de tipos
interface CedearsState {
  isLoading: boolean;
  items: Record<string, string>;
}

interface Boton {
  nombre: string;
  link: string;
}

export const GestionInversiones = (): JSX.Element => {
  const [cedearsState, setCedearsState] = useState<CedearsState>({
    isLoading: true,
    items: {},
  });

  useEffect(() => {
    // Función para obtener una cookie específica
    const getCookie = (name: string): string | null => {
      const cookies = document.cookie.split("; ");
      const cookie = cookies.find((row) => row.startsWith(`${name}=`));
      return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
    };

    const token = getCookie("authToken");
    console.log("Token:", token);
    if (!token) {
      console.error("El token de autorización no está presente.");
      return;
    }

    fetch("https://h4-09-fintech-production.up.railway.app/api/cedears", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setCedearsState({ isLoading: false, items: data });
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  }, []);

  const dataBotones: Boton[] = [
    { nombre: "Acciones", link: "acciones" },
    { nombre: "Bonos", link: "bonos" },
    { nombre: "ETFs", link: "etfs" },
    { nombre: "Fondos", link: "fondos" },
    { nombre: "Metales preciosos", link: "metales-preciosos" },
  ];

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
          <img src={mastercard} className="martercard" alt="MasterCard" />
          <span>12345678</span>
        </div>
        <div className="agregar">
          <PlusCircleIcon className="cruz-icon" />
        </div>
      </div>
      <h4>
        ¿En qué desea invertir?{" "}
        <Link to="/filtros-inversion">
          <AdjustmentsHorizontalIcon className="iconos-hero" />
        </Link>
      </h4>
      <p>Invertí de manera fácil y rápida en el mercado.</p>
      <div className="inversiones-btn-group">
        {dataBotones.map((boton, index) => (
          <NavLink to={boton.link} key={index}>
            {boton.nombre}
          </NavLink>
        ))}
      </div>
      <h5>Añadidos recientemente</h5>
      <section className="container-mercado">
        <Outlet />

        {cedearsState.isLoading ? (
          <div>Cargando mercado...</div>
        ) : (
          Object.keys(cedearsState.items).map((symbol, index) => {
            const companyName = cedearsState.items[symbol];
            return (
              <NavLink
                to="/detalle-economico"
                className="empresa box-section-standart"
                key={index}
              >
                <h5 className="clave">{symbol}</h5>
                <div className="nombre">
                  <h5>
                    {companyName} | <small>5 acciones</small>
                  </h5>
                  <div className="accion">
                    <div>ARS</div>
                    <span>$9,499.10</span>
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
              </NavLink>
            );
          })
        )}
      </section>
    </div>
  );
};
