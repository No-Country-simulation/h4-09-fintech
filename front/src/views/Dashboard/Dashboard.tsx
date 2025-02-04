import { useEffect, useState } from "react";
import "./Dashboard.css";
import { BellAlertIcon, XMarkIcon } from "@heroicons/react/24/outline";
import BarChartComponent from "./(components)/graficos/barchart/BarChart";
import Example from "./(components)/graficos/Linear/LinearChart";
import Circular from "./(components)/graficos/Pastel/PieChart";
import { UserIcon } from "@heroicons/react/16/solid";
import { NoteDash } from "./notificaciones/NoteDash";
import { Link } from "react-router-dom";
import logocarga from "../../assets/icons/(iupi)/Logo iupi 14px.svg";
import CircularProgress from "@mui/material/CircularProgress";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useUser } from "../../contexts/UserContext";

// Tipados
interface UserData {
  nombre: string;
  correo: string;
  currentAmount?: number; // Hacemos que sea opcional
}

interface FinancialGoal {
  name: string;
  targetAmount: string;
  progress: number;
}

export const Dashboard: React.FC = () => {
  // ESTADOS
  const [userdata, setUserData] = useState<UserData>({
    nombre: "",
    correo: "",
  });
  const {user} = useUser();
  const [loadingUserData, setLoadingUserData] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [btnObjetivo, setBtnObjetivo] = useState("Cargando...");
  const [objetivos, setObjetivos] = useState<FinancialGoal[]>([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [monto, setMonto] = useState<number>(0);
  const [errorMonto, setErrorMonto] = useState<string>("");

  // Función para obtener una cookie específica
  const getCookie = (name: string): string | null => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((row) => row.startsWith(`${name}=`));
    return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
  };

  // SOLICITUD PARA "OBJETIVOS FINANCIEROS Y PROGRESO"
  useEffect(() => {
    // setLoadingUserData(true);
    const token = getCookie("authToken");
    if (!token) {
      setError("No se encontró un token de autenticación.");
      return;
    }

    fetch(`https://h4-09-fintech-production.up.railway.app/api/user/goals`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener los objetivos.");
        return res.json();
      })
      .then((data) => {
        console.log("data objetivos", data);
        setObjetivos(data.length > 0 ? data : []); // Asegurarse de manejar un array vacío
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("No se pudieron cargar los objetivos.");
      });
  }, []);

  // Función para manejar el envío del formulario
  const handleSubmitModal = (event: React.FormEvent) => {
    event.preventDefault();
    if (monto <= 0) {
      setErrorMonto("El monto debe ser un número positivo.");
    } else {
      const token = getCookie("authToken");
      if (!token) {
        console.error("El token de autorización no está presente.");
        setError("No se encontró el token de autorización.");
        setLoadingUserData(false);
        return;
      }

      fetch(
        `https://h4-09-fintech-production.up.railway.app/api/user/add_funds`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: monto,
          }),
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("Error al obtener el fondo");
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err: Error) => {
          console.error(err);
        })
        .finally(() => setLoadingUserData(false));
      setOpen(false);

      alert(`Monto de recarga: ${monto}`);
      window.location.reload();
    }
  };

  // Condicional para botón de objetivos
  useEffect(() => {
    if (objetivos.length > 0) {
      setBtnObjetivo("objetivos");
    } else {
      setBtnObjetivo("Sin objetivos aún");
    }
  }, [objetivos]);

  // Pantallas de carga y errores
  if (loadingUserData) {
    return (
      <div className="spinner-dash">
        <img src={logocarga} alt="Cargando" />
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

  // Estilos modal
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70vw",
    height: "45vh",
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    display: "flex",
    textAlign: "center",
    flexDirection: "column",
    p: 4,
  };

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
        {
          user?.profileImageUrl === null ? <UserIcon id="foto-perfil" /> : <img src={user?.profileImageUrl} id="foto-perfil" />
        }
        <div>
          <h2>¡Hola {userdata.nombre}!</h2>
          <small className="correo-usuario-dash">{userdata.correo}</small>
        </div>
        <small className="free-plan">Free plan</small>
      </div>

      <div onClick={handleOpen} className="fondos-dash">
        <div>
          <h6>Fondo disponible</h6>$
          {userdata.currentAmount
            ? userdata.currentAmount.toLocaleString("es-AR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : "0,00"}
        </div>
        <small>cargar</small>
      </div>

      <BarChartComponent
        data={objetivos.map((goal) => ({
          name: goal.name,
          Progreso: goal.progress,
        }))}
        dataKey="Progreso"
        xAxisKey="name"
        boton={btnObjetivo}
      />
      <Example />
      <Circular />
      <div className="modal-fondos">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <XMarkIcon
                className="iconos-hero xmark-icono"
                onClick={handleClose}
              />

              <h3>Añadir fondos</h3>
              <p>
                Ingresa el monto que deseas recargar para agregarlo a tu cuenta.
              </p>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div className="monto-recarga">
                <h5>Tu monto actual es de :</h5>
                <span>${userdata.currentAmount}</span>
              </div>
              <form onSubmit={handleSubmitModal}>
                <input
                  type="number"
                  // value={monto}
                  onChange={(e) => setMonto(Number(e.target.value))}
                  placeholder="Nuevo monto"
                />
                {errorMonto && <span>{errorMonto}</span>}
                <div className="boton-modal">
                  <button type="submit">Añadir</button>
                </div>
              </form>
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
