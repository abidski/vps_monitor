import { useHistory } from "../hooks/useHistory";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

export default function HistoryChart() {
  const [hours, setHours] = useState(24);
  const { data, loading, error } = useHistory(hours);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="bg-gray-100/60 p-2 rounded-xl  flex justify-center gap-8 items-center m-7 text-xl font-medium span">
        {[24, 48, 72].map((h) => (
          <button
            key={h}
            onClick={() => setHours(h)}
            className={`p-2 px-4 font-bold text-xs uppercase rounded-sm text-gray-500 hover:bg-black hover:text-white`}
          >
            {h}h
          </button>
        ))}
      </div>

      <div
        className=" rounded-xl border-black border-2  bg-white p-10 w-full"
        style={{ height: 400 }}
      >
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="time"
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                });
              }}
              tickCount={6}
              minTickGap={100}
              stroke="#000000"
              tick={{ fontWeight: "bold", fontSize: 14, fill: "#000000" }}
              angle={-45}
              textAnchor="end"
              height={60}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              unit="%"
              stroke="#000000"
              tick={{ fontWeight: "bold", fontSize: 14, fill: "#000000" }}
              tickLine={false}
            />
            <Tooltip
              labelFormatter={(t) =>
                new Date(t).toLocaleTimeString([], {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }
            />
            <Legend
              iconType="square"
              iconSize={12}
              formatter={(value) => value.toUpperCase()}
              wrapperStyle={{
                paddingTop: "20px",
                display: "flex",
                justifyContent: "center",
                gap: "32px",
              }}
            />
            <Line
              type="monotone"
              dataKey="cpu"
              stroke="#111"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="mem"
              stroke="#aaa"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#666"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
