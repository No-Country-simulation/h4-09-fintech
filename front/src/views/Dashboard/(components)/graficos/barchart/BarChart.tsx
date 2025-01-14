import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import BasicSelect from "../../../../../components/MUI/BasicSelect";

// Definir las interfaces para las props
interface BarChartComponentProps {
  data: { name: string; ventas: number }[]; // Ajustamos el tipo de `data` para que sea un array de objetos con propiedades `name` y `ventas`
  dataKey: string; // Tipo de `dataKey` como `string`
  xAxisKey: string; // Tipo de `xAxisKey` como `string`
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({
  data,
  dataKey,
  xAxisKey,
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: "29.38vh",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "6.03vh",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h3>Objetivos financieros</h3>
          <h4>Progreso total</h4>
        </div>
        <BasicSelect />
      </div>
      <div
        style={{
          width: "100%",
          height: "21.61vh",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={xAxisKey} // Cambiar a `xAxisKey` para usar la prop
              tick={{ fontSize: 8, fill: "black" }} // Cambia el tamaño y color del texto en el eje X
            />
            <YAxis
              domain={[0, 150]} // Limita el rango entre 0 y 200
              ticks={[0, 50, 100, 150]} // Especifica los valores donde deben aparecer las marcas
              tick={{ fontSize: 10, fill: "#000000" }} // Personaliza las etiquetas
            />
            <Tooltip />
            <Bar dataKey={dataKey} fill="#0048b2" barSize={11.9} />{" "}
            {/* Usamos `dataKey` como prop */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartComponent;
