import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface FinancialGoal {
  name: string;
  targetAmount: number;
  targetDate?: string; // No obligatorio
}

function CrearObjetivo() {
  const [goal, setGoal] = useState<FinancialGoal | null>(null); // Cambiado a null como valor inicial
  const [goalName, setGoalName] = useState<string>("");
  const [goalTargetAmount, setGoalTargetAmount] = useState<string>(""); // Guardamos como string para facilitar el input controlado
  const [errors, setErrors] = useState<{
    name?: string;
    targetAmount?: string;
  }>({});

  const navigate = useNavigate();

  // POST del goal
  useEffect(() => {
    if (!goal) return; // Evitamos enviar si el goal es null

    // Función para obtener una cookie específica
    const getCookie = (name: string): string | null => {
      const cookies = document.cookie.split("; ");
      const cookie = cookies.find((row) => row.startsWith(`${name}=`));
      return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
    };

    const token = getCookie("authToken");

    fetch(
      `https://h4-09-fintech-production.up.railway.app/api/user/create_goal`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(goal),
      }
    ).then(() => console.log("Objetivo enviado:", goal));
  }, [goal]);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    const financialGoal: FinancialGoal = {
      name: goalName,
      targetAmount: parseFloat(goalTargetAmount),
    };
    setGoal(financialGoal); // Esto activa el useEffect para enviar los datos al backend
    alert("Has creado un nuevo objetivo");

    // Limpia el formulario
    setGoalName("");
    setGoalTargetAmount("");
    setErrors({});
    navigate("/dashboard");
    window.location.reload();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 max-w-md mx-auto border rounded shadow-sm space-y-4"
    >
      <h2 className="text-xl font-bold text-center">
        Crear Objetivo Financiero
      </h2>

      <div>
        <label htmlFor="goalName" className="block font-medium mb-1">
          Nombre del Objetivo
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
          Monto Objetivo
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
  );
}

export default CrearObjetivo;
