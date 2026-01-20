import React, { useState } from 'react';

const WeatherTableView = ({ weatherData, onDelete }) => {
  const [sortBy, setSortBy] = useState('comfort'); // 'comfort', 'temp', 'name'
  const [filterByCondition, setFilterByCondition] = useState('all');

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
    if (score >= 75) return '#27ae60'; // Green - Excellent
    if (score >= 60) return '#f39c12'; // Orange - Good
    if (score >= 45) return '#e74c3c'; // Red - Fair
    return '#c0392b'; // Dark Red - Poor
  };

  const getComfortLabel = (score) => {
    if (score >= 75) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 45) return 'Fair';
    return 'Poor';
  };

  const sortedData = [...(weatherData || [])].sort((a, b) => {
    switch (sortBy) {
      case 'temp':
        return b.temp - a.temp;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'comfort':
      default:
        return b.comfortIndex - a.comfortIndex;
    }
  });

  const filteredData = sortedData.filter(city => {
    if (filterByCondition === 'all') return true;
    return city.description.toLowerCase().includes(filterByCondition.toLowerCase());
  });

  return (
    <div className="table-view-container">
      <div className="table-controls">
        <div className="controls-group">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="control-select">
            <option value="comfort">Comfort Index </option>
            <option value="temp">Temperature </option>
            <option value="name">City Name A-Z</option>
          </select>
        </div>
        <div className="controls-group">
          <label>Condition:</label>
          <select value={filterByCondition} onChange={(e) => setFilterByCondition(e.target.value)} className="control-select">
            <option value="all">All</option>
            <option value="clear">Clear</option>
            <option value="cloud">Cloudy</option>
            <option value="rain">Rainy</option>
            <option value="snow">Snowy</option>
          </select>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="weather-table">
          <thead>
            <tr>
              <th className="rank-col">Rank</th>
              <th className="city-col">City</th>
              <th className="condition-col">Condition</th>
              <th className="temp-col">Temperature</th>
              <th className="comfort-col">Comfort Index</th>
              <th className="details-col">Details</th>
              <th className="action-col">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((city, index) => (
              <tr key={city.name} className="weather-row">
                <td className="rank-col">
                  <span className={`rank-badge rank-${index + 1}`}>
                    #{index + 1}
                  </span>
                </td>
                <td className="city-col">
                  <div className="city-name-wrapper">
                    <span className="city-icon">{getWeatherIcon(city.description)}</span>
                    <div className="city-info">
                      <div className="city-name">{city.name}</div>
                    </div>
                  </div>
                </td>
                <td className="condition-col">
                  <span className="condition-badge">{city.description}</span>
                </td>
                <td className="temp-col">
                  <div className="temp-display">
                    <span className="temp-current">{Math.round(city.temp)}°</span>
                    <span className="temp-range">
                      {Math.round(city.tempMin)}° - {Math.round(city.tempMax)}°
                    </span>
                  </div>
                </td>
                <td className="comfort-col">
                  <div className="comfort-score">
                    <div 
                      className="comfort-bar"
                      style={{
                        background: `linear-gradient(90deg, ${getComfortColor(city.comfortIndex)}, ${getComfortColor(city.comfortIndex)}99)`,
                        width: `${city.comfortIndex}%`
                      }}
                    />
                    <span className="comfort-value">{Math.round(city.comfortIndex)}</span>
                  </div>
                  <span className="comfort-label">{getComfortLabel(city.comfortIndex)}</span>
                </td>
                <td className="details-col">
                  <div className="details-mini">
                    <span> {city.humidity}%</span>
                    <span> {city.windSpeed.toFixed(1)}m/s</span>
                  </div>
                </td>
                <td className="action-col">
                  <button 
                    className="btn-delete"
                    onClick={() => onDelete(city.name)}
                    title="Delete city"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredData.length === 0 && (
        <div className="no-data-message">
          <p>No cities found with the selected filters</p>
        </div>
      )}
    </div>
  );
};

export default WeatherTableView;
