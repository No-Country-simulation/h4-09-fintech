import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./ObjetivosFinancieros.css";
import {
  ArrowLeftIcon,
  CheckIcon,
  PencilIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

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
  borderRadius: "8px",
  p: 4,
};

// Tipados
interface FinancialGoal {
  name: string;
  targetDate: string;
  targetAmount: string;
  goalId: string;
  progress: number;
}

// Componente principal
export const ObjetivosFinancieros = () => {
  const [objetivosList, setObjetivosList] = useState<FinancialGoal[]>([]);
  const [open, setOpen] = React.useState(false);
  const [infoModal, setInfoModal] = useState({
    name: "",
    id: "",
    targetAmount: "",
  });
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error
  const [formError, setFormError] = useState<string | null>(null); // Error del formulario

  const cargarModal = (
    id: string,
    name: string,
    targetAmount: string
  ): void => {
    setInfoModal({ name, id, targetAmount });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  // OBTENER GOALS
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

  // submit form in modal edit goal
  const handleGoalUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null); // Reiniciar errores de formulario

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const targetAmount = formData.get("targetAmount") as string;

    // Validación de los campos
    if (!name || name.trim().length === 0) {
      setFormError("El nombre no puede estar vacío.");
      return;
    }
    if (
      !targetAmount ||
      isNaN(Number(targetAmount)) ||
      Number(targetAmount) <= 0
    ) {
      setFormError("El costo debe ser un número mayor a 0.");
      return;
    }

    const updatedGoal = {
      name,
      targetAmount,
    };

    const getCookie = (name: string): string | null => {
      const cookies = document.cookie.split("; ");
      const cookie = cookies.find((row) => row.startsWith(`${name}=`));
      return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
    };

    const token = getCookie("authToken");
    if (!token) {
      setError("No se encontró un token de autenticación.");
      return;
    }

    fetch(
      `https://h4-09-fintech-production.up.railway.app/api/user/update_goal`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedGoal),
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Error al actualizar el objetivo.");
        return res.json();
      })
      .then(() => {
        setObjetivosList((prevList) =>
          prevList.map((goal) =>
            goal.goalId === infoModal.id ? { ...goal, ...updatedGoal } : goal
          )
        );
        setError(null); // Reiniciar errores
        handleClose(); // Cerrar el modal después de la actualización
      })
      .catch((err) => {
        console.error(err);
        setError("No se pudo actualizar el objetivo.");
      });
  };

  return (
    <div className="container-obj-financieros">
      <h1>
        <Link to="/dashboard" className="link-rrdom">
          <ArrowLeftIcon className="iconos-hero flecha-izquierda arrow-prev-adjust" />
        </Link>
        Objetivos financieros
      </h1>
      <section>
        <Link to="/crear-objetivo" className="add-goal-btn">
          + Crear objetivo
        </Link>

        {isLoading ? (
          <p>Cargando objetivos...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <article id="goal-list">
            {objetivosList.map((objetivo) => (
              <div key={objetivo.goalId} className="goal-in-list">
                <div className="container-goal-info">
                  <h5>
                    {objetivo.name}
                    {objetivo.progress >= 100 ? (
                      <CheckIcon className="iconos-hero check-goal" />
                    ) : (
                      ""
                    )}
                  </h5>
                  <div className="data-goal">
                    <div>
                      <p>progeso:&nbsp;</p>
                      <h6>{objetivo.progress}%</h6>
                    </div>
                    <div>
                      <p>monto:&nbsp;</p>
                      <h6>
                        $
                        {objetivo.targetAmount
                          ? Number(objetivo.targetAmount).toLocaleString(
                              "es-AR",
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )
                          : "0,00"}
                      </h6>
                    </div>
                  </div>
                </div>
                <PencilIcon
                  className="iconos-hero"
                  onClick={() =>
                    cargarModal(
                      objetivo.goalId,
                      objetivo.name,
                      objetivo.targetAmount
                    )
                  }
                />
              </div>
            ))}
          </article>
        )}
      </section>
      <div className="container-modal-edit-goal">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <XMarkIcon
              className="iconos-hero xmark-icono"
              onClick={handleClose}
            />
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {infoModal.name}
              <p>
                {" "}
                Estas apunto de cambiar <br /> los datos de este objetivo
              </p>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <form onSubmit={handleGoalUpdate}>
                <label htmlFor="name">
                  Nombre:
                  <input
                    type="text"
                    name="name"
                    id="name"
                    defaultValue={infoModal.name}
                  />
                </label>
                <label htmlFor="targetAmount">
                  Nuevo costo:
                  <input
                    type="number"
                    name="targetAmount"
                    id="targetAmount"
                    placeholder={`Costo actual:${infoModal.targetAmount}`}
                  />
                </label>
                {formError && <p style={{ color: "red" }}>{formError}</p>}
                <button type="submit">Actualizar</button>
              </form>
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
};
