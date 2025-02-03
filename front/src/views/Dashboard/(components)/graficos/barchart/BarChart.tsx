import React from "react";
import "./BarChart.css";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
// import BasicSelect from "../../../../../components/MUI/BasicSelect";

// Definir las interfaces para las props
interface BarChartComponentProps {
  data: { name: string; Progreso: number }[]; // Ajustamos el tipo de `data` para que sea un array de objetos con propiedades `name` y `ventas`
  dataKey: string; // Tipo de `dataKey` como `string`
  xAxisKey: string; // Tipo de `xAxisKey` como `string`
  boton: string; // Tipo de `boton` como `string`
}
const CustomLabel = (props: any) => {
  const { x, y, width, value } = props;
  return (
    <text
      x={x + width / 2}
      y={y - 5}
      fill="#000"
      textAnchor="middle"
      fontSize={10}
    >
      {value}%
    </text>
  );
};

const BarChartComponent: React.FC<BarChartComponentProps> = ({
  data,
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
          padding: "8px 3%",
          right: "2%",
          top: "13.48%",
          transform: "translateY(-50%)",
          minWidth: "max-content",
          fontSize: "0.65rem",
          backgroundColor: "#01255c",
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
          <Bar
            dataKey={(entry) => Math.min(entry.Progreso, 100)}
            barSize={11.9}
            label={<CustomLabel />}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.Progreso >= 100 ? "#00b200" : "#0048b2"}
              />
            ))}
          </Bar>

          {/* Usamos `dataKey` como prop */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
