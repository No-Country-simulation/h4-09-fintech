import React, { PureComponent } from "react";
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
    name: "Page A",
    Ingresos: 4000,
    Egresos: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    Ingresos: 3000,
    Egresos: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    Ingresos: 2000,
    Egresos: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    Ingresos: 2780,
    Egresos: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    Ingresos: 1890,
    Egresos: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    Ingresos: 2390,
    Egresos: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    Ingresos: 3490,
    Egresos: 4300,
    amt: 2100,
  },
];

export default class Example extends PureComponent {
  static demoUrl =
    "https://codesandbox.io/p/sandbox/line-chart-width-xaxis-padding-8v7952";

  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "34.68vh",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
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
      </div>
    );
  }
}
