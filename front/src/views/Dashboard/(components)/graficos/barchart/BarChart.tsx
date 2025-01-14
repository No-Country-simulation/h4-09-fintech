import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  // Legend,
  ResponsiveContainer,
} from "recharts";

const BarChartComponent = ({ data, dataKey, xAxisKey }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "21.61vh",
        border: "1px solid black",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 8, fill: "black" }} // Cambia el tamaño y color del texto en el eje X
          />
          <YAxis
            domain={[0, 150]} // Limita el rango entre 0 y 200
            ticks={[0, 50, 100, 150]} // Especifica los valores donde deben aparecer las marcas
            tick={{ fontSize: 10, fill: "#000000" }} // Personaliza las etiquetas
          />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="ventas" fill="#0048b2" barSize={11.9} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
