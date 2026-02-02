import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFavorite } from "../redux/favoriteSlice";
import { Droplet, Droplets, Wind, X, Star } from "lucide-react";
import "../styles/components/WeatherCard.css";

const WeatherCard = ({ cityId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cityInfo = useSelector((state) =>
    state.favorites.items.find((f) => f.id === cityId),
  );
  const weather = useSelector((state) => state.weather.current[cityId]);
  const unit = useSelector((state) => state.settings.unit);

  if (!cityInfo) return null;

  const handleRemove = (e) => {
    e.stopPropagation();
    dispatch(removeFavorite(cityId));
  };

  // const getTemp = (k) => {
  //   if (k === undefined) return "--";
  //   if (unit === "imperial") return Math.random((k * 9) / 5 + 32) + "°F";
  //   return Math.random(k) + "°C";
  // };

  const getTemp = (temp) => {
    if (temp === undefined || temp === null) return "--";

    if (unit === "imperial") {
      return `${Math.round((temp * 9) / 5 + 32)}°F`;
    }

    return `${Math.round(temp)}°C`;
  };

  const temp = weather?.main?.temp;
  const condition = weather?.weather?.[0]?.main || "Loading...";
  const iconCode = weather?.weather?.[0]?.icon || "04d";
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div
      className="glass-panel weather-card"
      onClick={() => navigate(`/city/${cityId}`)}
    >
      <button onClick={handleRemove} className="card-remove-btn">
        {/* <X size={16} /> */}
        <Star  size={16} fill="#fbbf24" color="#fbbf24"/>
      </button>

      <div className="card-header">
        <div>
          <h3 className="city-name">{cityInfo.name}</h3>
          <p className="country-name">{cityInfo.country}</p>
        </div>
        {weather && (
          <img src={iconUrl} alt={condition} className="weather-icon" />
        )}
      </div>

      <div className="card-body">
        <div className="temp-display">{getTemp(temp)}</div>
        <div className="condition-text">{condition}</div>

        <div className="card-footer">
          <div className="stat-item">
            <Droplets size={14} />
            <span>{weather?.main?.humidity}%</span>
          </div>
          <div className="stat-item">
            <Wind size={14} />
            <span>{weather?.wind?.speed} m/s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
