import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useSelector } from "react-redux";
import { format } from 'date-fns';
import "../styles/components/Analytics.css";

const HourlyChart = ({ data , onClick, className = ''}) => {
  const unit = useSelector((state) => state.settings.unit);

  const formatTemp = (val) => {
    if (unit === "imperial") return Math.round((val * 9) / 5 + 32);
    return Math.round(val);
  };

  const chartData = data.slice(0, 8).map((item) => ({
    time: item.dt,
    temp: item.main.temp,
    displayTime: format(new Date(item.dt * 1000), "h a"),
  }));

  return (
    <div
      className={`glass-panel chart-container-glass ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <h3 className="chart-title">Temperature Trend (Next 24h)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
        >
          <defs>
            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.1} />
            </linearGradient>
          </defs>
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
          <YAxis hide={true} domain={["auto", "auto"]} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255,255,255,0.9)",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              color: "#0f172a",
            }}
            itemStyle={{ color: "#0f172a" }}
            formatter={(value) => [`${formatTemp(value)}°`, "Temperature"]}
          />
          <Area
            type="monotone"
            dataKey="temp"
            stroke="#4f46e5"
            strokeWidth={4}
            fillOpacity={0.8}
            fill="url(#colorTemp)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HourlyChart;
