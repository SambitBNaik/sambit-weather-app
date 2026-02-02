import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getForecast } from "../redux/weatherSlice";
import { addFavorite, removeFavorite } from "../redux/favoriteSlice";
import "../styles/pages/DetailsPage.css";
import "../styles/components/ErrorComp.css";
import {
  ArrowLeft,
  Droplets,
  Gauge,
  Thermometer,
  Wind,
  Star,
} from "lucide-react";

import HourlyChart from "../components/HourlyChart";
import PrecipitationChart from "../components/PrecipitationChart";
import WindChart from "../components/WindChart";
import ForecastStrip from "../components/ForecastStrip";
import ErrorComp from "../components/ErrorComp";
import LoadingComp from "../components/LoadingComp";

const DetailsPage = () => {
  const { cityId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();


  const favoriteCity = useSelector((state) =>
    state.favorites.items.find((f) => f.id === cityId)
  );

  const city = favoriteCity || location.state?.city;

  const forecastData = useSelector((state) => state.weather.forecast[cityId]);
  const weatherCurrent = useSelector((state) => state.weather.current[cityId]);
  const unit = useSelector((state) => state.settings.unit);

  const [expandedChart, setExpandedChart] = useState(null);

  useEffect(() => {
    if (city) {
      dispatch(getForecast({ cityId, lat: city.lat, lon: city.lon }));
    }
  }, [city, cityId, dispatch]);

  const handleToggleFavorite = () => {
    if (!city) return;

    if (favoriteCity) {
      dispatch(removeFavorite(city.id));
    } else {
      dispatch(addFavorite(city));
    }
  };

  if (!city) {
    return (
      <ErrorComp/>
    );
  }

  if (!forecastData || !weatherCurrent) {
    return (
      <LoadingComp/>
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
              <ArrowLeft size={24} /> Back
            </button>

            {expandedChart === "hourly" && <HourlyChart data={list} />}
            {expandedChart === "precip" && (
              <PrecipitationChart data={list} />
            )}
            {expandedChart === "wind" && <WindChart data={list} />}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="details-header">
        <button onClick={() => navigate("/")} className="glass-panel back-btn">
          <ArrowLeft size={20} />
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "15px",
            flex: 1,
          }}
        >
          <div>
            <h2 className="city-title">{city.name}</h2>
            <span className="city-subtitle">{city.country}</span>
          </div>

          <button
            onClick={handleToggleFavorite}
            className="glass-panel icon-btn"
            style={{
              padding: "8px",
              border: "none",
              cursor: "pointer",
              background: "rgba(255,255,255,0.2)",
            }}
          >
            <Star
              size={20}
              fill={favoriteCity ? "#fbbf24" : "none"}
              color={favoriteCity ? "#fbbf24" : "white"}
            />
          </button>
        </div>
      </div>

      {/* Stats */}
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

      {/* Charts */}
      <div className="charts-grid-container">
        <HourlyChart data={list} onClick={() => setExpandedChart("hourly")} />
        <PrecipitationChart
          data={list}
          onClick={() => setExpandedChart("precip")}
        />
        <WindChart data={list} onClick={() => setExpandedChart("wind")} />
      </div>

      {/* Forecast */}
      <ForecastStrip data={list} />
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
