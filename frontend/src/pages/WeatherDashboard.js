import React, { useState, useEffect, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Header from '../components/Header';
import AuthButtons from '../components/AuthButtons';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import WeatherChart from '../components/WeatherChart';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import weatherService from '../services/WeatherService';

const WeatherDashboard = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeatherData = useCallback(async () => {
  try {
    setLoading(true);
    setError(null);

    let token = null;
    if (isAuthenticated) {
      try {
        token = await getAccessTokenSilently();
      } catch (tokenError) {
        console.warn("Failed to get access token:", tokenError);
      }
    }

    if (!token) {
      setError("You need to be signed in to view weather data.");
      setWeatherData(null);
      return;
    }

    const data = await weatherService.getWeatherData(token);
    setWeatherData(data);
  } catch (err) {
    console.error("Error fetching weather data:", err);
    setError("Failed to load weather data. Please try again.");
    setWeatherData(null);
  } finally {
    setLoading(false);
  }
}, [isAuthenticated, getAccessTokenSilently]);

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  const handleAddCity = async (cityCode) => {
    if (!isAuthenticated) {
      throw new Error('Please sign in to add cities');
    }

    try {
      const token = await getAccessTokenSilently();
      const newWeatherData = await weatherService.addCity(cityCode, token);
      
      // Add the new city to the current data
      setWeatherData(prev => [...prev, newWeatherData]);
    } catch (err) {
      console.error('Error adding city:', err);
      throw err;
    }
  };

  const handleDeleteCity = async (cityName) => {
    if (!isAuthenticated) {
      alert('Please sign in to delete cities');
      return;
    }

    try {
      const token = await getAccessTokenSilently();
      
      // Find the city to get its ID/code
      const cityToDelete = weatherData.find(city => city.name === cityName);
      if (!cityToDelete) return;

      // For this demo, we'll use a simple city code mapping
      const cityCodeMap = {
        'Colombo': '1248991',
        'Tokyo': '1850147',
        'Liverpool': '2644210',
        'Paris': '2988507',
        'Sydney': '2147714',
        'Boston': '4930956',
        'Shanghai': '1796236',
        'Oslo': '3143244'
      };

      const cityCode = cityCodeMap[cityName];
      if (cityCode) {
        await weatherService.deleteCity(cityCode, token);
        setWeatherData(prev => prev.filter(city => city.name !== cityName));
      }
    } catch (err) {
      console.error('Error deleting city:', err);
      alert('Failed to delete city. Please try again.');
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <Header />
      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}

      <AuthButtons />
      
      
      {!error && (
        <>
          <SearchBar 
            onAddCity={handleAddCity} 
            cities={weatherData}
          />
          
          {weatherData.length > 0 && (
            <>
              <div className="weather-grid">
                {weatherData.map((weather, index) => (
                  <WeatherCard 
                    key={index}
                    weather={weather}
                    onDelete={handleDeleteCity}
                  />
                ))}
              </div>
              
              <WeatherChart weatherData={weatherData} />
              
              <Footer />
            </>
          )}
          
          {weatherData.length === 0 && !loading && (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px',
              color: 'rgba(255, 255, 255, 0.7)'
            }}>
              <p>No weather data available. {isAuthenticated ? 'Add some cities to get started!' : 'Sign in to view weather data.'}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WeatherDashboard;