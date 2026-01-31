import React from "react";
import { format } from "date-fns";
import { useSelector } from "react-redux";

const ForecastStrip = ({ data }) => {
  const unit = useSelector((state) => state.settings.unit);

  const groupedDates = data.reduce((acc, item) => {
    const dateKey = format(new Date(item.dt * 1000), "yyyy-MM-dd");
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(item);
    return acc;
  }, {});

  const dailyData = Object.values(groupedDates)
    .map((slots) => {
      const middleIndex = Math.floor(slots.length / 2);
      return slots[middleIndex];
    })
    .slice(0, 5);

  const formatTemp = (val) => {
    if (unit === "imperial") return Math.round((val * 9) / 5 + 32);
    return Math.round(val);
  };
  return (
    <div className="glass-panel forecast-container">
      <h3 className="chart-title">5-Day Forecast</h3>
      <div className="forecast-grid">
        {dailyData.map((day, idx) => (
          <div key={idx} className="forecast-cell">
            <span className="forecast-day-label">
              {format(new Date(day.dt * 1000), "EEE")}
            </span>
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt={day.weather[0].main}
              className="forecast-icon"
            />
            <span className="forecast-temp">{formatTemp(day.main.temp)}°</span>
            <span className="forecast-main">{day.weather[0].main}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastStrip;
