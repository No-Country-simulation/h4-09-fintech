import React, { useState, useEffect } from "react";
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

interface BarChartComponentProps {
  data: { name: string; Progreso: number }[];
  dataKey: string;
  xAxisKey: string;
  boton: string;
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [barSize, setBarSize] = useState(11.9); // Valor inicial del grosor de las barras

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Cambiar el grosor de las barras según el ancho de la ventana
      setBarSize(window.innerWidth > 425 ? 20 : 11.9);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        className="toggle-btn-barchart"
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
            dataKey={xAxisKey}
            tick={{
              fontSize: 8,
              fill: "#000000",
              fontWeight: "var(--font-poppins-300)",
            }}
            axisLine={false}
          />
          <YAxis
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
            tick={{
              fontSize: windowWidth > 425 ? 14 : 10,
              fill: "#000000",
              fontWeight: "var(--font-poppins-300)",
            }}
            axisLine={false}
          />
          <Tooltip />
          <Bar
            dataKey={(entry) => Math.min(entry.Progreso, 100)}
            barSize={barSize} // Usar el valor dinámico de barSize
            label={<CustomLabel />}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.Progreso >= 100 ? "#00b200" : "#0048b2"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
