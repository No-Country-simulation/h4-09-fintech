import { useEffect, useState } from "react";
import "./Dashboard.css";
import { BellAlertIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import BarChartComponent from "./(components)/graficos/barchart/BarChart";
import Example from "./(components)/graficos/Linear/LinearChart";
import Circular from "./(components)/graficos/Pastel/PieChart";
import { UserIcon } from "@heroicons/react/16/solid";
import { NoteDash } from "./notificaciones/NoteDash";
import { Link } from "react-router-dom";
import logocarga from "../../assets/icons/(iupi)/Logo iupi 14px.svg";
import CircularProgress from "@mui/material/CircularProgress";

// Tipados para typescript
interface UserData {
  nombre: string;
  correo: string;
}
// ESTADOS
export const Dashboard: React.FC = () => {
  const [userdata, setUserData] = useState<UserData>({
    nombre: "",
    correo: "",
  });
  const [loadingUserData, setLoadingUserData] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [btnObjetivo, setBtnObjetivo] = useState("objetivos");

  // SOLICITUD PARA "DATOS DE USUARIO"
  useEffect(() => {
    // Función para obtener una cookie específica
    const getCookie = (name: string): string | null => {
      const cookies = document.cookie.split("; ");
      const cookie = cookies.find((row) => row.startsWith(`${name}=`));
      return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
    };

    const token = getCookie("authToken");
    if (!token) {
      console.error("El token de autorización no está presente.");
      setError("No se encontró el token de autorización.");
      setLoadingUserData(false);
      return;
    }

    fetch(
      `https://h4-09-fintech-production.up.railway.app/api/auth/check-login`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener los datos del usuario");
        }
        return res.json();
      })
      .then((data) => {
        setUserData({
          nombre: data.name || "Usuario",
          correo: data.username || "Correo no disponible",
        });
        setError(null);
      })
      .catch((err: Error) => {
        console.error(err);
        setError(
          "Por motivos de seguridad tu sesión a expirado.Vuelve a iniciar sesión"
        );
      })
      .finally(() => setLoadingUserData(false));
  }, []);
  // --------------------------------
  // SOLICITUD PARA "OBJETIVOS FINANCIEROS Y PROGESO"
  useEffect(() => {}, []);
  // DATA PARA GRAFICO DE BARRAS
  const dataBarras = [
    { name: "Casa", ventas: 50 },
    // { name: "Auto", ventas: 20 },
    // { name: "Viaje", ventas: 3 },
    // { name: "Jubilación", ventas: 75 },
    // { name: "Educación", ventas: 100 },
  ];
  // condicional para boton de objetivos
  useEffect(() => {
    if (dataBarras.length > 0) {
      setBtnObjetivo("objetivos");
    } else {
      setBtnObjetivo("Sin objetivos aún");
    }
  }, [dataBarras]);

  // pantallas de carga
  if (loadingUserData) {
    return (
      <div className="spinner-dash">
        <img src={logocarga} />
        <CircularProgress
          style={{
            color: "var(--color-fondo)",
          }}
        />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  // --------------------
  return (
    <div className="dashboard">
      <h1 className="titulo-dash">
        Dashboard{" "}
        <Link to="/notificaciones" className="container-bell link-rrdom">
          <div className="counter-notif">2</div>
          <BellAlertIcon className="iconos-hero" />
        </Link>
      </h1>
      <NoteDash />
      <div className="container-usuario flex">
        <UserIcon id="foto-perfil" />
        <div>
          <h2>¡Hola {userdata.nombre}!</h2>
          <small className="correo-usuario-dash">{userdata.correo}</small>
        </div>
        <small className="free-plan">Free plan</small>
      </div>

      <div className="añadir-tarjeta flex">
        <div>
          <PlusCircleIcon className="cruz-icon" />
        </div>
        Añadir tarjeta de crédito
      </div>

      <BarChartComponent
        data={dataBarras}
        dataKey="ventas"
        xAxisKey="name"
        boton={btnObjetivo || "Cargando..."}
      />
      <Example />
      <Circular />
    </div>
  );
};
