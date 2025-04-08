// src/components/TopBanner.js
import React from 'react';
import '../CSS/TopBanner.css';

const TopBanner = () => {
  return (
    <div className="top-banner">
      <div className="top-banner-buttons">
        <button className="btn-link">Centro Gabo</button>
        <button className="btn-link">Festival Gabo</button>
        <button className="btn-link">Red Ética</button>
      </div>
    </div>
  );
};

export default TopBanner;
