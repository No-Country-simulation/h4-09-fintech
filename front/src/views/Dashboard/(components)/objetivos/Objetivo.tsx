import { Link, useParams } from "react-router-dom";

export const Objetivo = () => {
  const { nombre } = useParams();
  return (
    <div>
      Objetivo: <strong>{nombre}</strong>
      <Link to="/objetivos">
        <button>Mis objetivos</button>
      </Link>
      <Link to="/dashboard">
        <button>dashboard</button>
      </Link>
    </div>
  );
};
