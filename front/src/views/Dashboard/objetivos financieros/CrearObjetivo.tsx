import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CrearObjetivo.css";
import Modal from "../../../components/modal/Modal";

interface FinancialGoal {
  name: string;
  targetAmount: number;
  targetDate?: string; // No obligatorio
}

function CrearObjetivo() {
  const [goalName, setGoalName] = useState<string>("");
  const [goalTargetAmount, setGoalTargetAmount] = useState<string>("");
  const [errors, setErrors] = useState<{
    name?: string;
    targetAmount?: string;
  }>({});

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // Función para obtener una cookie específica
  const getCookie = (name: string): string | null => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((row) => row.startsWith(`${name}=`));
    return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
  };

  const validateForm = (): boolean => {
    const newErrors: { name?: string; targetAmount?: string } = {};

    if (goalName.length < 2 || goalName.length > 20) {
      newErrors.name = "El nombre debe tener entre 2 y 20 caracteres.";
    }

    if (!goalTargetAmount || isNaN(parseFloat(goalTargetAmount))) {
      newErrors.targetAmount = "El monto objetivo debe ser un número válido.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    const financialGoal: FinancialGoal = {
      name: goalName,
      targetAmount: parseFloat(goalTargetAmount),
    };

    try {
      const token = getCookie("authToken");
      const response = await fetch(
        `https://h4-09-fintech-production.up.railway.app/api/user/create_goal`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(financialGoal),
        }
      );

      if (!response.ok) throw new Error("Error al crear el objetivo");

      setModalMessage("Has creado un nuevo objetivo");
      setIsModalOpen(true);
      console.log("Modal debería abrirse:", isModalOpen);

      setGoalName("");
      setGoalTargetAmount("");
      setErrors({});

      setTimeout(() => {
        navigate("/objetivos-financieros");
        // window.location.reload();
      }, 2000); // Espera antes de redirigir
    } catch (error) {
      console.error("Error:", error);
      setModalMessage("Hubo un problema al guardar el objetivo. Inténtalo de nuevo.");
      setIsModalOpen(true);
    }
  };

  return (
    <div className="container-crear-objetivo">
      <h1>
        <Link to="/objetivos-financieros" className="link-rrdom">
          <ArrowLeftIcon className="iconos-hero flecha-izquierda arrow-prev-adjust" />
        </Link>
        Nuevo objetivo
      </h1>
      <form
        onSubmit={handleSubmit}
        className="p-4 max-w-md mx-auto border rounded shadow-sm space-y-4"
      >
        <label htmlFor="goalName" className="block font-medium mb-1">
          Nombre del Objetivo:
          <input
            type="text"
            id="goalName"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            placeholder="Ej: Comprar casa"
            className={`w-full border rounded p-2 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </label>

        <label htmlFor="goalTargetAmount" className="block font-medium mb-1">
          Valor del Objetivo:
          <input
            type="number"
            id="goalTargetAmount"
            value={goalTargetAmount}
            onChange={(e) => setGoalTargetAmount(e.target.value)}
            placeholder="Ej: 1000"
            className={`w-full border rounded p-2 ${
              errors.targetAmount ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {errors.targetAmount && (
            <p className="text-red-500 text-sm mt-1">{errors.targetAmount}</p>
          )}
        </label>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Guardar Objetivo
        </button>
      </form>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          title="Mensaje"
          message={modalMessage}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default CrearObjetivo;
