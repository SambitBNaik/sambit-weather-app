import React from "react";
import "../styles/components/LoadingComp.css";

const LoadingComp = () => {
  return (
    <div className="loading-container">
      <div className="glass-panel loading-card">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading Analytics...</p>
      </div>
    </div>
  );
};

export default LoadingComp;
