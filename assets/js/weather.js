// Update date daily
function updateDate() {
    const dateElement = document.getElementById('date-display');
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    dateElement.textContent = new Date().toLocaleDateString(undefined, options);
}

const locationName = "{{ site.weather_location | default: 'San Francisco' }}";

// Fetch weather data
async function fetchWeather() {
    const weatherElement = document.getElementById('weather-display');
    try {
        // First, convert location name to coordinates using Open-Meteo Geocoding API
        const geocodeResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(locationName)}&count=1`);
        const geocodeData = await geocodeResponse.json();

        if (!geocodeData.results || geocodeData.results.length === 0) {
        throw new Error('Location not found');
        }

        const { latitude, longitude } = geocodeData.results[0];

        // Fetch weather data from Open-Meteo API
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature,weather_code,wind_speed_10m`);
        const data = await weatherResponse.json();

        // Display temperature and weather information
        if (data && data.current) {
        const temp = data.current.temperature;
        const weatherCode = data.current.weather_code;
        const weather = getWeatherDescription(weatherCode);

        weatherElement.innerHTML = `${locationName}: ${temp}°C - ${weather}`;
        } else {
        weatherElement.textContent = 'Weather data unavailable';
        }
    } catch (error) {
        weatherElement.textContent = 'Failed to fetch weather';
        console.error(error);
    }
}

// Convert weather codes to descriptions
function getWeatherDescription(code) {
    // WMO Weather interpretation codes (https://open-meteo.com/en/docs)
    const weatherCodes = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Fog',
        48: 'Depositing rime fog',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        61: 'Slight rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        71: 'Slight snow',
        73: 'Moderate snow',
        75: 'Heavy snow',
        95: 'Thunderstorm',
        96: 'Thunderstorm with slight hail',
        99: 'Thunderstorm with heavy hail'
    };
    return weatherCodes[code] || 'Unknown';
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    updateDate();
    fetchWeather();
    // Update date and weather every hour
    setInterval(() => {
        updateDate();
        fetchWeather();
    }, 3600000);
});
