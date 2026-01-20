import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const WeatherChart = ({ weatherData }) => {
  // Prepare data for the chart
  const chartData = weatherData.map(weather => ({
    name: weather.name,
    temperature: Math.round(weather.temp),
    humidity: Math.floor(Math.random() * 30) + 60, // Mock humidity data
    pressure: Math.floor(Math.random() * 50) + 1000 // Mock pressure data
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          border: '1px solid rgba(142, 96, 96, 0.2)',
          borderRadius: '8px',
          padding: '12px',
          color: 'white'
        }}>
          <p style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ margin: '4px 0', color: entry.color }}>
              {entry.name}: {entry.value}{entry.name === 'Temperature' ? '°C' : entry.name === 'Humidity' ? '%' : 'hPa'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container">
      <h3 className="chart-title">Weather Overview</h3>
      
      {/* Temperature Line Chart */}
      <div style={{ marginBottom: '40px' }}>
        <h4 style={{ textAlign: 'center', marginBottom: '20px', opacity: 0.9 }}>
          Temperature Comparison
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(180, 34, 34, 0.2)" />
            <XAxis 
              dataKey="name" 
              stroke="rgba(117, 79, 79, 0.8)"
              fontSize={12}
            />
            <YAxis 
              stroke="rgba(111, 55, 55, 0.8)"
              fontSize={12}
              label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: 'rgba(255,255,255,0.8)' } }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="temperature" 
              stroke="#6c5ce7" 
              strokeWidth={3}
              dot={{ fill: '#6c5ce7', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, stroke: '#6c5ce7', strokeWidth: 2 }}
              name="Temperature"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Humidity Bar Chart */}
      <div>
        <h4 style={{ textAlign: 'center', marginBottom: '20px', opacity: 0.9 }}>
          Humidity Levels
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 79, 79, 0.2)" />
            <XAxis 
              dataKey="name" 
              stroke="rgba(143, 84, 84, 0.8)"
              fontSize={12}
            />
            <YAxis 
              stroke="rgba(112, 52, 52, 0.8)"
              fontSize={12}
              label={{ value: 'Humidity (%)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: 'rgba(255,255,255,0.8)' } }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="humidity" 
              fill="#00d4aa"
              name="Humidity"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeatherChart;