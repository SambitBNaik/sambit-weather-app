import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import "../styles/components/Analytics.css";

const WindChart = ({ data, onClick, className = "" }) => {
  const chartData = data.slice(0, 12).map((item) => ({
    time: item.dt,
    speed: item.wind.speed,
    displayTime: format(new Date(item.dt * 1000), "h a"),
  }));

  return (
    <div
      className={`glass-panel chart-container-glass ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <h3 className="chart-title">Wind Speed (m/s)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="rgba(0,0,0,0.2)"
          />
          <XAxis
            dataKey="displayTime"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12 }}
          />
          <YAxis
            hide={false}
            dataKey="speed"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255,255,255,0.9)",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              color: "#0f172a",
            }}
            itemStyle={{ color: "#9333ea" }}
            formatter={(value) => [`${value} m/s`, "Wind Speed"]}
          />
          <Line
            type="monotone"
            dataKey="speed"
            stroke="#9333ea"
            strokeWidth={4}
            dot={{ fill: "#9333ea", r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WindChart;
