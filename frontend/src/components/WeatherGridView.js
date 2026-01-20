import React, { useState } from 'react';

const WeatherGridView = ({ weatherData, onDelete }) => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'compact'

  const getWeatherIcon = (description) => {
    const desc = description.toLowerCase();
    if (desc.includes('clear')) ;
    if (desc.includes('cloud')) ;
    if (desc.includes('rain')) ;
    if (desc.includes('snow')) ;
    if (desc.includes('thunderstorm')) ;
    if (desc.includes('mist') || desc.includes('fog')) ;
    return '🌤️';
  };

  const getComfortColor = (score) => {
    if (score >= 75) return '#27ae60';
    if (score >= 60) return '#f39c12';
    if (score >= 45) return '#e74c3c';
    return '#c0392b';
  };

  const getComfortLabel = (score) => {
    if (score >= 75) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 45) return 'Fair';
    return 'Poor';
  };

  // Sort by comfort index
  const sortedData = [...(weatherData || [])].sort((a, b) => b.comfortIndex - a.comfortIndex);

  const CompactCard = ({ city, index }) => (
    <div className="compact-card">
      <div className="compact-header">
        <div className="compact-rank">#{index + 1}</div>
        <button 
          className="btn-compact-delete"
          onClick={() => onDelete(city.name)}
        >
          ✕
        </button>
      </div>
      <div className="compact-body">
        <div className="compact-icon">{getWeatherIcon(city.description)}</div>
        <div className="compact-info">
          <h4>{city.name}</h4>
          <p className="compact-temp">{Math.round(city.temp)}°C</p>
          <p className="compact-desc">{city.description}</p>
        </div>
      </div>
      <div className="compact-score">
        <div className="score-circle" style={{ borderColor: getComfortColor(city.comfortIndex) }}>
          {Math.round(city.comfortIndex)}
        </div>
        <p className="score-label">{getComfortLabel(city.comfortIndex)}</p>
      </div>
    </div>
  );

  const StandardCard = ({ city, index }) => (
    <div className="grid-card">
      <div className="grid-card-header">
        <div className="rank-circle">{index + 1}</div>
        <button 
          className="btn-grid-delete"
          onClick={() => onDelete(city.name)}
        >
          ✕
        </button>
      </div>

      <div className="grid-card-weather">
        <span className="weather-emoji">{getWeatherIcon(city.description)}</span>
        <h3 className="city-title">{city.name}</h3>
        <p className="weather-desc">{city.description}</p>
      </div>

      <div className="grid-card-temp">
        <div className="temp-main">
          <span className="temp-value">{Math.round(city.temp)}°</span>
          <span className="temp-unit">C</span>
        </div>
        <div className="temp-range">
          <span>L: {Math.round(city.tempMin)}°</span>
          <span>H: {Math.round(city.tempMax)}°</span>
        </div>
      </div>

      <div className="grid-card-comfort">
        <div 
          className="comfort-circle" 
          style={{
            background: `conic-gradient(${getComfortColor(city.comfortIndex)} 0deg ${city.comfortIndex * 3.6}deg, rgba(255,255,255,0.1) ${city.comfortIndex * 3.6}deg 360deg)`
          }}
        >
          <div className="comfort-inner">
            <span className="comfort-score-text">{Math.round(city.comfortIndex)}</span>
          </div>
        </div>
        <p className="comfort-status">{getComfortLabel(city.comfortIndex)}</p>
      </div>

      <div className="grid-card-details">
        <div className="detail-row">
          
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{city.humidity}%</span>
        </div>
        <div className="detail-row">
          
          <span className="detail-label">Wind</span>
          <span className="detail-value">{city.windSpeed.toFixed(1)}m/s</span>
        </div>
        <div className="detail-row">
          
          <span className="detail-label">Pressure</span>
          <span className="detail-value">{Math.round(city.pressure)}hPa</span>
        </div>
        <div className="detail-row">
          
          <span className="detail-label">Visibility</span>
          <span className="detail-value">{(city.visibility / 1000).toFixed(1)}km</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid-view-container">
      <div className="grid-header">
        <h2>Weather Analytics</h2>
        <div className="view-toggle">
          <button 
            className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            Grid View
          </button>
          <button 
            className={`toggle-btn ${viewMode === 'compact' ? 'active' : ''}`}
            onClick={() => setViewMode('compact')}
          >
            Compact View
          </button>
        </div>
      </div>

      {viewMode === 'grid' && (
        <div className="grid-container">
          {sortedData.map((city, index) => (
            <StandardCard key={city.name} city={city} index={index + 1} />
          ))}
        </div>
      )}

      {viewMode === 'compact' && (
        <div className="compact-container">
          {sortedData.map((city, index) => (
            <CompactCard key={city.name} city={city} index={index + 1} />
          ))}
        </div>
      )}

      {sortedData.length === 0 && (
        <div className="no-data-message">
          <p>No weather data available. Add a city to get started!</p>
        </div>
      )}
    </div>
  );
};

export default WeatherGridView;
