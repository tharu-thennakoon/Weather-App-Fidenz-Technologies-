const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

class WeatherService {
  async getWeatherData(token = null) {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/weather`, {
      method: 'GET',
      headers
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication required');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  async addCity(cityCode, token) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    const response = await fetch(`${API_BASE_URL}/weather/add`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        cityCode: cityCode
      })
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication required');
      }
      throw new Error(`Failed to add city: ${response.status}`);
    }

    return await response.json();
  }

  async deleteCity(cityCode, token) {
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    const response = await fetch(`${API_BASE_URL}/weather/${cityCode}`, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication required');
      }
      throw new Error(`Failed to delete city: ${response.status}`);
    }

    return true;
  }
}

const weatherService = new WeatherService();
export default weatherService;