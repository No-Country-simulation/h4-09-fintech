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
    Ingresos: 4000,
    Egresos: 2400,
    amt: 2400,
  },
  {
    name: "Febrero",
    Ingresos: 3000,
    Egresos: 1398,
    amt: 2210,
  },
  {
    name: "Marzo",
    Ingresos: 2000,
    Egresos: 9800,
    amt: 2290,
  },
  {
    name: "Abril",
    Ingresos: 2780,
    Egresos: 3908,
    amt: 2000,
  },
  {
    name: "Mayo",
    Ingresos: 1890,
    Egresos: 4800,
    amt: 2181,
  },
  {
    name: "Junio",
    Ingresos: 2390,
    Egresos: 3800,
    amt: 2500,
  },
  {
    name: "Julio",
    Ingresos: 3490,
    Egresos: 4300,
    amt: 2100,
  },
];

const Example = () => {
  return (
    <section
      style={{
        height: "23.17vh",
        margin: "0 3vw 1.83vh 3vw",
      }}
      className="box-section"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend layout="horizontal" verticalAlign="top" />
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
