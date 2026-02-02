import React from "react";
import "../styles/components/ErrorComp.css";
import { useNavigate } from "react-router-dom";

const ErrorComp = () => {
    const navigate = useNavigate();
  return (
    <div className="error-container">
      <div className="glass-panel error-card">
        <div className="error-icon-wrapper">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <h2 className="error-title">City Not Found</h2>
        <p className="error-message">
          We couldn't find the weather data for this city. It may have been
          removed from your favorites or the link is invalid.
        </p>
        <button
          onClick={() => navigate("/")}
          className="glass-panel error-button"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ErrorComp;
