import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CrearObjetivo.css";

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

      alert("Has creado un nuevo objetivo");
      setGoalName("");
      setGoalTargetAmount("");
      setErrors({});
      navigate("/objetivos-financieros");
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema al guardar el objetivo.");
    }
  };

  return (
    <div className="container-crear-objetivo">
      <h1>
        <Link to="/objetivos-financieros" className="link-rrdom">
          <ArrowLeftIcon className="iconos-hero flecha-izquierda" />
        </Link>
        Nuevo objetivo
      </h1>
      <form
        onSubmit={handleSubmit}
        className="p-4 max-w-md mx-auto border rounded shadow-sm space-y-4"
      >
        <div>
          <label htmlFor="goalName" className="block font-medium mb-1">
            Nombre del Objetivo:
          </label>
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
        </div>

        <div>
          <label htmlFor="goalTargetAmount" className="block font-medium mb-1">
            Valor del Objetivo:
          </label>
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
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Guardar Objetivo
        </button>
      </form>
    </div>
  );
}

export default CrearObjetivo;
