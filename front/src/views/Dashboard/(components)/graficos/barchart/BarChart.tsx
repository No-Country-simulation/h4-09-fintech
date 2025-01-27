import React from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
// import BasicSelect from "../../../../../components/MUI/BasicSelect";

// Definir las interfaces para las props
interface BarChartComponentProps {
  data: { name: string; ventas: number }[]; // Ajustamos el tipo de `data` para que sea un array de objetos con propiedades `name` y `ventas`
  dataKey: string; // Tipo de `dataKey` como `string`
  xAxisKey: string; // Tipo de `xAxisKey` como `string`
  boton: string; // Tipo de `boton` como `string`
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({
  data,
  dataKey,
  xAxisKey,
  boton,
}) => {
  return (
    <div className="box-section">
      <div className="container-sub-g">
        <h1>Objetivos financieros</h1>
        <small>Progreso total</small>
      </div>
      <Link
        to="/objetivos-financieros"
        style={{
          position: "absolute",
          padding: "2% 3%",
          right: "2%",
          top: "13.48%",
          transform: "translateY(-50%)",
          minWidth: "max-content",
          fontSize: "0.65rem",
          backgroundColor: "var(--color-primario)",
          color: "var(--color-fondo)",
          borderRadius: "100px",
        }}
      >
        {boton || "Sin objetivos"}
      </Link>
      <ResponsiveContainer width="100%" height="73.08%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 0,
            right: 10,
            left: -30,
            bottom: 0,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey={xAxisKey} // Cambiar a `xAxisKey` para usar la prop
            tick={{
              fontSize: 8,
              fill: "#000000",
              fontWeight: "var(--font-poppins-300)",
            }} // Cambia el tamaño y color del texto en el eje X
            axisLine={false}
          />
          <YAxis
            domain={[0, 100]} // Limita el rango entre 0 y 200
            ticks={[0, 25, 50, 75, 100]} // Especifica los valores donde deben aparecer las marcas
            tick={{
              fontSize: 10,
              fill: "#000000",
              fontWeight: "var(--font-poppins-300)",
            }} // Personaliza las etiquetas
            axisLine={false}
          />
          <Tooltip />
          <Bar dataKey={dataKey} fill="#0048b2" barSize={11.9} />{" "}
          {/* Usamos `dataKey` como prop */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
