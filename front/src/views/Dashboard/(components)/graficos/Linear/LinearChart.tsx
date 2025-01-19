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
    <section className="box-section">
      <div className="container-sub-g">
        <h1>Balance general</h1>
        <small>Total dólares</small>
      </div>
      <ResponsiveContainer width="100%" height="73.08%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 0,
            right: 20,
            left: -18,
            bottom: 0,
          }}
        >
          <CartesianGrid horizontal={false} />
          <XAxis
            dataKey="name"
            tick={{
              fontSize: 8,
              fill: "#000000",
              fontWeight: "var(--font-poppins-300)",
            }}
            axisLine={false}
          />
          <YAxis
            domain={[0, 1000]}
            ticks={[0, 100, 300, 600, 1000]}
            tick={{
              fontSize: 10,
              fill: "#000000",
              fontWeight: "var(--font-poppins-300)",
            }}
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
