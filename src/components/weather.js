import React, { useState } from 'react';
import axios from 'axios';
import './weather.css';

const Weather = () => {
    const [location, setLocation] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const fetchWeather = async () => {
        try {
            const apiKey = '48cd30240eaa031f1a28045941a9a889';
            const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather`, {
                params: {
                    q: location,
                    appid: apiKey,
                    units: 'metric',
                },
            });
            console.log(response);
            setWeather(response.data);
            setError('');
        } catch (err) {
            setError('Location not found. Please try again.');
            setWeather(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeather();
    };

    return (
        <div className="container">
            <h1>Weather App</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter location"
                />
                <button type="submit">Get Weather</button>
            </form>
            {error && <p className="error">{error}</p>}
            {weather && (
                <div className="weather-info">
                    <h2>{weather.name}</h2>
                    <img
                        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt={weather.weather[0].description}
                        className="weather-icon"
                    />
                    <p className="temperature">{weather.main.temp} °C</p>
                    <p className="description">{weather.weather[0].description}</p>
                    <div className="details">
                        <div>Humidity: {weather.main.humidity}%</div>
                        <div>Wind Speed: {weather.wind.speed} m/s</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Weather;
