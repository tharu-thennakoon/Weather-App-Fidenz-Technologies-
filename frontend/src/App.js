import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import WeatherDashboard from './pages/WeatherDashboard';
import Loading from './components/Loading';
import './App.css';

function App() {
  const { isLoading } = useAuth0();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check localStorage for dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    document.documentElement.setAttribute('data-theme', savedDarkMode ? 'dark' : 'light');
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
    document.documentElement.setAttribute('data-theme', newDarkMode ? 'dark' : 'light');
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router>
      <div className="App" data-theme={darkMode ? 'dark' : 'light'}>
        <button className="dark-mode-toggle" onClick={toggleDarkMode} title="Toggle dark mode">
          {darkMode ? '☀️' : '🌙'}
        </button>
        <Routes>
          <Route path="/" element={<WeatherDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;