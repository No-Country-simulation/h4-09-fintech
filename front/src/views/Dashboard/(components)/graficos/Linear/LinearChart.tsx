import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Enero",
    Ingresos: 400,
    Egresos: 245,
    amt: 2400,
  },
  {
    name: "Febrero",
    Ingresos: 300,
    Egresos: 143,
    amt: 2210,
  },
  {
    name: "Marzo",
    Ingresos: 200,
    Egresos: 1000,
    amt: 2290,
  },
  {
    name: "Abril",
    Ingresos: 278,
    Egresos: 399,
    amt: 2000,
  },
  {
    name: "Mayo",
    Ingresos: 189,
    Egresos: 490,
    amt: 2181,
  },
  {
    name: "Junio",
    Ingresos: 239,
    Egresos: 388,
    amt: 2500,
  },
  {
    name: "Julio",
    Ingresos: 349,
    Egresos: 439,
    amt: 2100,
  },
];

const Example = () => {
  return (
    <section
      style={{
        height: "35.17vh",
        width: "94vw",
        margin: "0 3vw 1.83vh 3vw",
        position: "relative",
      }}
      className="box-section"
    >
      <div className="container-sub-g">
        <h3 className="h3-grafico">Balance general</h3>
        <h4 className="h4-grafico">Total dólares</h4>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: -20,
            bottom: -10,
          }}
        >
          <CartesianGrid horizontal={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 8, fill: "black" }}
            axisLine={false}
          />
          <YAxis
            domain={[0, 1000]}
            ticks={[0, 100, 300, 600, 1000]}
            tick={{ fontSize: 10, fill: "#000000" }}
            axisLine={false}
          />
          <Tooltip />
          <Legend
            layout="horizontal"
            verticalAlign="top"
            iconType="circle"
            align="center"
          />
          <Line
            type="monotone"
            dataKey="Ingresos"
            stroke="#0048B2"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="Egresos" stroke="#CC0003" />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
};

export default Example;
