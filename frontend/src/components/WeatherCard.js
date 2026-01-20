import React from 'react';

const WeatherCard = ({ weather, onDelete }) => {
  const getWeatherIcon = (description) => {
    const desc = description.toLowerCase();
    if (desc.includes('clear')) ;
    if (desc.includes('cloud')) ;
    if (desc.includes('rain')) return ;
    if (desc.includes('snow')) return ;
    if (desc.includes('thunderstorm')) return ;
    if (desc.includes('mist') || desc.includes('fog')) ;
    ;
  };

  const getCityClass = (cityName) => {
    return cityName.toLowerCase().replace(/[^a-z]/g, '');
  };

  const formatDate = () => {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
    const date = now.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
    return `${time}, ${date}`;
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatVisibility = (visibility) => {
    return `${(visibility / 1000).toFixed(1)}km`;
  };

  const formatWindSpeed = (speed) => {
    return `${speed.toFixed(1)}m/s`;
  };

  return (
    <div className={`weather-card ${getCityClass(weather.name)}`}>
      <button className="close-btn" onClick={() => onDelete(weather.name)}>
        <span className="material-icons">close</span>
      </button>
      
      <div className="card-header">
        <div className="city-name">{weather.name}</div>
        <div className="date-time">{formatDate()}</div>
      </div>
      
      <div className="weather-main">
        <div className="weather-info">
          <div className="weather-description">
            <span className="material-icons weather-icon">{getWeatherIcon(weather.description)}</span>
            {weather.description.charAt(0).toUpperCase() + weather.description.slice(1)}
          </div>
          <div className="temp-range">
            Temp Min: {Math.round(weather.tempMin)}°C<br/>
            Temp Max: {Math.round(weather.tempMax)}°C
          </div>
        </div>
        <div className="temperature">
          {Math.round(weather.temp)}°C
        </div>
      </div>
      
      <div className="weather-details">
        <div className="detail-item">
          <span className="material-icons detail-icon">compress</span>
          <div className="detail-label">Pressure:</div>
          <div className="detail-value">{Math.round(weather.pressure)}hPa</div>
        </div>
        <div className="detail-item">
          <span className="material-icons detail-icon">opacity</span>
          <div className="detail-label">Humidity:</div>
          <div className="detail-value">{Math.round(weather.humidity)}%</div>
        </div>
        <div className="detail-item">
          <span className="material-icons detail-icon">visibility</span>
          <div className="detail-label">Visibility:</div>
          <div className="detail-value">{formatVisibility(weather.visibility)}</div>
        </div>
        <div className="detail-item">
          <span className="material-icons detail-icon">air</span>
          <div className="detail-label">Wind:</div>
          <div className="detail-value">{formatWindSpeed(weather.windSpeed)}</div>
        </div>
        <div className="detail-item">
          <span className="material-icons detail-icon">wb_twilight</span>
          <div className="detail-label">Sunrise:</div>
          <div className="detail-value">{formatTime(weather.sunrise)}</div>
        </div>
        <div className="detail-item">
          <span className="material-icons detail-icon">nights_stay</span>
          <div className="detail-label">Sunset:</div>
          <div className="detail-value">{formatTime(weather.sunset)}</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;