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
// import BasicSelect from "../../../../../components/MUI/BasicSelect";

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
    <div className="box-section">
      <div className="container-sub-g">
        <h1>Objetivos financieros</h1>
        <small>Progreso total</small>
      </div>
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
            tick={{ fontSize: 8, fill: "black" }} // Cambia el tamaño y color del texto en el eje X
            axisLine={false}
          />
          <YAxis
            domain={[0, 150]} // Limita el rango entre 0 y 200
            ticks={[0, 50, 100, 150]} // Especifica los valores donde deben aparecer las marcas
            tick={{ fontSize: 10, fill: "#000000" }} // Personaliza las etiquetas
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
