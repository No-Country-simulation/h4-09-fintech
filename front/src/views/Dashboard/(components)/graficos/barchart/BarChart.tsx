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
    <div
      style={{
        height: "35.17vh",
        margin: "0 3vw 1.83vh 3vw",
        width: "94vw",
      }}
      className="box-section"
    >
      <div className="container-sub-g">
        <h3 className="h3-grafico">Objetivos financieros</h3>
        <h4 className="h4-grafico">Progreso total</h4>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 25,
            right: 10,
            left: -30,
            bottom: -10,
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
