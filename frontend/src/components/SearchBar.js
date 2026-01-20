import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const SearchBar = ({ onAddCity, cities }) => {
  const { isAuthenticated } = useAuth0();
  const [cityInput, setCityInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Available cities from the JSON data
  const availableCities = [
    { code: '1248991', name: 'Colombo' },
    { code: '1850147', name: 'Tokyo' },
    { code: '2644210', name: 'Liverpool' },
    { code: '2988507', name: 'Paris' },
    { code: '2147714', name: 'Sydney' },
    { code: '4930956', name: 'Boston' },
    { code: '1796236', name: 'Shanghai' },
    { code: '3143244', name: 'Oslo' }
  ];

  const handleAddCity = async () => {
    if (!isAuthenticated) {
      alert('Please sign in to add cities');
      return;
    }

    if (!cityInput.trim()) {
      alert('Please enter a city name');
      return;
    }

    const selectedCity = availableCities.find(
      city => city.name.toLowerCase() === cityInput.toLowerCase()
    );

    if (!selectedCity) {
      alert('City not found in available list. Available cities: ' + 
            availableCities.map(c => c.name).join(', '));
      return;
    }

    // Check if city is already added
    const isAlreadyAdded = cities.some(
      city => city.name.toLowerCase() === selectedCity.name.toLowerCase()
    );

    if (isAlreadyAdded) {
      alert('City is already added to your list');
      return;
    }

    setIsLoading(true);
    try {
      await onAddCity(selectedCity.code);
      setCityInput('');
    } catch (error) {
      alert('Failed to add city. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddCity();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Enter a city name..."
        value={cityInput}
        onChange={(e) => setCityInput(e.target.value)}
        onKeyPress={handleKeyPress}
        className="search-input"
        disabled={!isAuthenticated}
      />
      <button 
        onClick={handleAddCity}
        className="add-btn"
        disabled={!isAuthenticated || isLoading}
      >
        {isLoading ? 'Adding...' : 'Add City'}
      </button>
    </div>
  );
};

export default SearchBar;