import { format } from "date-fns";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import React from "react";
import "../styles/components/Analytics.css";

const PrecipitationChart = ({ data, onClick, className = "" }) => {
  const chartData = data.slice(0, 12).map((item) => ({
    time: item.dt,
    pop: Math.round(item.pop * 100),
    displayTime: format(new Date(item.dt * 1000), "h a"),
  }));

  return (
    <div
      className={`glass-panel chart-container-glass ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <h3 className="chart-title">Precipitation Chance (Next 36h)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
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
            dataKey="pop"
            unit="%"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12 }}
          />
          <Tooltip
            cursor={{ fill: "rgba(0,0,0,0.05)" }}
            contentStyle={{
              backgroundColor: "rgba(255,255,255,0.9)",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              color: "#0f172a",
            }}
            itemStyle={{ color: "#0ea5e9" }}
            formatter={(value) => [`${value}%`, "Chance of Rain"]}
          />
          <Bar
            dataKey="pop"
            fill="#0284c7"
            radius={[4, 4, 0, 0]}
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PrecipitationChart;
