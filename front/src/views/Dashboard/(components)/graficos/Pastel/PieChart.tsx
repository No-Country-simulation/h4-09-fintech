import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer, PieProps } from "recharts";
import "./PieChart.css";
import { LightBulbIcon } from "@heroicons/react/24/outline";

// Tipo para los datos
interface DataItem {
  name: string;
  value: number;
}

const data: DataItem[] = [
  { name: "Ahorros", value: 400 },
  { name: "Group B", value: 300 },
];

// Tipo para las propiedades de `renderActiveShape`
interface ActiveShapeProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: DataItem;
  percent: number;
  value: number;
}

const renderActiveShape = (props: ActiveShapeProps): JSX.Element => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos; // Inicio de la línea
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 20) * cos; // Punto medio más corto
  const my = cy + (outerRadius + 20) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 12; // Extensión horizontal más corta
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 10}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 10}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

// Tipo para el estado del componente
interface ExampleState {
  activeIndex: number;
}

export default class Example extends PureComponent<{}, ExampleState> {
  static demoUrl =
    "https://codesandbox.io/s/pie-chart-with-customized-active-shape-y93si";

  // Inicialización del estado con el índice activo
  state: ExampleState = {
    activeIndex: 0,
  };

  // Método para manejar el evento `onMouseEnter`
  onPieEnter = (_: PieProps, index: number): void => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    return (
      <div
        style={{
          height: "max-content",
          width: "95%",
          margin: "auto",
        }}
      >
        <div
          style={{
            height: "5.5vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <div className="container-sub-g">
            <h3 className="h3-grafico">Incrementa tus ahorros</h3>
            <h4 className="h4-grafico">Progreso actual</h4>
          </div>
          <div className="c-meta-ahorro">
            <h6>
              <div className="pelota-meta"></div>Meta
            </h6>
            <span>$10,000</span>
          </div>
          <div className="c-meta-ahorro">
            <h6>
              <div className="pelota-ahorrando"></div>Ahorrando
            </h6>
            <span>$3,200</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "max-content",
            width: "100%",
          }}
        >
          <div className="container-grafico-torta">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={100} height={100}>
                <Pie
                  activeIndex={this.state.activeIndex}
                  activeShape={renderActiveShape}
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={40}
                  fill="#0048B2"
                  // fill="#94ADB7"
                  dataKey="value"
                  onMouseEnter={this.onPieEnter}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="sugerencia-personalizada">
            <LightBulbIcon className="iconos-hero" />
            <div>
              <h4>Sugerencia personalizada</h4>
              Aumenta tu ahorro mensual un 10% para alcanzar tu objetivo 2 meses
              antes.
            </div>
          </div>
        </div>
        <button className="btn-ahorro-auto">
          Configurar ahorro automático
        </button>
      </div>
    );
  }
}
