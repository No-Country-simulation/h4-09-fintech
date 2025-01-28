import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

// estilos del modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",
  height: "80vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

// Tipados
interface FinancialGoal {
  name: string;
  targetDate: string;
  targetAmount: string;
  goalId: string;
}

// Componente principal
export const ObjetivosFinancieros = () => {
  const [objetivosList, setObjetivosList] = useState<FinancialGoal[]>([]);
  const [open, setOpen] = React.useState(false);
  const [infoModal, setInfoModal] = useState({
    nombre: "",
    id: "",
  });
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error

  const cargarModal = (id: string, nombre: string): void => {
    setOpen(true);
    setInfoModal({ nombre, id });
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const getCookie = (name: string): string | null => {
      const cookies = document.cookie.split("; ");
      const cookie = cookies.find((row) => row.startsWith(`${name}=`));
      return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
    };

    const token = getCookie("authToken");
    if (!token) {
      setError("No se encontró un token de autenticación.");
      setIsLoading(false);
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
        setObjetivosList(data);
        setError(null); // Reiniciar errores
      })
      .catch((err) => {
        console.error(err);
        setError("No se pudieron cargar los objetivos.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <h1>Mis objetivos</h1>
      {isLoading ? (
        <p>Cargando objetivos...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <ul>
          {objetivosList.map((objetivo) => (
            <li
              key={objetivo.goalId}
              style={{
                display: "flex",
                justifyContent: "space-between",
                border: "solid black 1px",
              }}
            >
              <div>
                <h5>{objetivo.name}</h5>
                <h6>{objetivo.targetAmount}</h6>
              </div>
              <Button
                onClick={() => cargarModal(objetivo.goalId, objetivo.name)}
              >
                Editar
              </Button>
            </li>
          ))}
        </ul>
      )}
      <Link to="/crear-objetivo">+ Crear objetivo</Link>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {infoModal.nombre}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
