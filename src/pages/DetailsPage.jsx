import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getForecast } from "../features/weatherSlice";
import "../styles/pages/DetailsPage.css";
import { ArrowLeft, Droplets, Gauge, Thermometer, Wind } from "lucide-react";
import HourlyChart from "../components/HourlyChart";
import PrecipitationChart from "../components/PrecipitationChart";
import WindChart from "../components/WindChart";
import ForecastStrip from "../components/ForecastStrip";

const DetailsPage = () => {
  const { cityId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const city = useSelector((state) =>
    state.favorites.items.find((f) => f.id === cityId),
  );
  const forecastData = useSelector((state) => state.weather.forecast[cityId]);
  const weatherCurrent = useSelector((state) => state.weather.current[cityId]);
  const unit = useSelector((state) => state.settings.unit);
  const [expandedChart, setExpandedChart] = useState(null);

  useEffect(() => {
    if (city) {
      dispatch(getForecast({ cityId, lat: city.lat, lon: city.lon }));
    }
  }, [city, cityId, dispatch]);

  if (!city) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        City not found in favorites.{" "}
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  if (!forecastData || !weatherCurrent) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        Loading Analytics...
      </div>
    );
  }

  const { list } = forecastData;

  const formatVal = (val, type) => {
    if (val === undefined || val === null) return "--";

    if (type === "temp") {
      return unit === "imperial"
        ? `${Math.round((val * 9) / 5 + 32)}°F`
        : `${Math.round(val)}°C`;
    }

    return val;
  };

  return (
    <div className="details-page">
      {expandedChart && (
        <div className="chart-overlay" onClick={() => setExpandedChart(null)}>
          <div
            className="chart-overlay-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-overlay-btn"
              onClick={() => setExpandedChart(null)}
            >
              <ArrowLeft size={24} />
              Back
            </button>
            {expandedChart === "hourly" && <HourlyChart data={list} />}
            {expandedChart === "precip" && <PrecipitationChart data={list} />}
            {expandedChart === "wind" && <WindChart data={list} />}
          </div>
        </div>
      )}
      <div className="details-header">
        <button onClick={() => navigate("/")} className="glass-panel back-btn">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="city-title">{city.name}</h2>
          <span className="city-subtitle">{city.country}</span>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          icon={<Thermometer size={20} color="#f472b6" />}
          label="Feels Like"
          value={formatVal(weatherCurrent.main.feels_like, "temp")}
        />
        <StatCard
          icon={<Droplets size={20} color="#38bdf8" />}
          label="Humidity"
          value={`${weatherCurrent.main.humidity}%`}
        />
        <StatCard
          icon={<Wind size={20} color="#a78bfa" />}
          label="Wind"
          value={`${weatherCurrent.wind.speed} m/s`}
        />
        <StatCard
          icon={<Gauge size={20} color="#34d399" />}
          label="Pressure"
          value={`${weatherCurrent.main.pressure} hPa`}
        />
      </div>

      <div className="charts-grid-container">
        <HourlyChart data={list} onClick={()=>setExpandedChart('hourly')}/>
        <PrecipitationChart data={list} onClick={()=>setExpandedChart('precip')}/>
        <WindChart data={list} onClick={()=>setExpandedChart('wind')}/>
      </div>

      <ForecastStrip data={list}/>
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="glass-panel stat-card">
    <div className="stat-icon-wrapper">{icon}</div>
    <div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  </div>
);
export default DetailsPage;
