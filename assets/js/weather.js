// Update date daily
function updateDate() {
    const dateElement = document.getElementById('date-display');
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    dateElement.textContent = new Date().toLocaleDateString(undefined, options);
}

// For local testing, hardcode this value
// const locationName = "San Francisco"; 
// When deploying with Jekyll, change to: 
// const locationName = "{{ site.weather_location | default: 'San Francisco' }}";

// Get weather icon based on weather code
function getWeatherIcon(code) {
    // Map weather codes to Shoelace icons
    const iconMap = {
        0: 'sun', // Clear sky
        1: 'sun', // Mainly clear
        2: 'cloud-sun', // Partly cloudy
        3: 'clouds', // Overcast
        45: 'cloud-fog', // Fog
        48: 'cloud-fog', // Depositing rime fog
        51: 'cloud-drizzle', // Light drizzle
        53: 'cloud-drizzle', // Moderate drizzle
        55: 'cloud-drizzle', // Dense drizzle
        61: 'cloud-rain', // Slight rain
        63: 'cloud-rain', // Moderate rain
        65: 'cloud-rain-heavy', // Heavy rain
        71: 'cloud-snow', // Slight snow
        73: 'cloud-snow', // Moderate snow
        75: 'cloud-snow', // Heavy snow
        95: 'cloud-lightning', // Thunderstorm
        96: 'cloud-lightning-rain', // Thunderstorm with slight hail
        99: 'cloud-lightning-rain', // Thunderstorm with heavy hail
    };
    
    return iconMap[code] || 'question-circle';
}

// Convert weather codes to descriptions
function getWeatherDescription(code) {
    // WMO Weather interpretation codes
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

// Format day name from date
function getDayName(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { weekday: 'short' });
}

// Fetch weather data
async function fetchWeather() {
    const weatherElement = document.getElementById('weather-display');
    const forecastContainer = document.getElementById('forecast-container');
    
    // Show loading states
    document.querySelector('.weather-icon sl-icon').setAttribute('name', 'arrow-repeat');
    forecastContainer.innerHTML = '<div class="forecast-loading">Loading forecast...</div>';
    
    try {
        // First, convert location name to coordinates
        const geocodeResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(locationName)}&count=1`);
        const geocodeData = await geocodeResponse.json();

        if (!geocodeData.results || geocodeData.results.length === 0) {
            throw new Error('Location not found!');
        }

        const { latitude, longitude } = geocodeData.results[0];
        
        // Fetch current weather and 5-day forecast
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?` +
            `latitude=${latitude}&longitude=${longitude}&` +
            `current=temperature,weather_code,wind_speed_10m&` +
            `daily=weather_code,temperature_2m_max,temperature_2m_min&` +
            `timezone=auto&forecast_days=6`
        );
        
        const data = await weatherResponse.json();

        // Display current weather information
        if (data?.current) {
            const temp = data.current.temperature;
            const weatherCode = data.current.weather_code;
            const weather = getWeatherDescription(weatherCode);
            const windSpeed = data.current.wind_speed_10m;
            
            // Update the weather icon
            document.querySelector('.weather-icon sl-icon').setAttribute('name', getWeatherIcon(weatherCode));
            
            // Update the current weather text
            weatherElement.innerHTML = `
                <div><strong>${locationName}</strong></div>
                <div>${temp}°C - ${weather}</div>
                <div style="font-size: 0.8em; opacity: 0.8;">Wind: ${windSpeed} km/h</div>
            `;
            
            // Display 5-day forecast
            if (data?.daily) {
                forecastContainer.innerHTML = '';
                
                // Skip today (index 0) and show next 5 days
                for (let i = 1; i < Math.min(6, data.daily.time.length); i++) {
                    const dayName = getDayName(data.daily.time[i]);
                    const maxTemp = Math.round(data.daily.temperature_2m_max[i]);
                    const minTemp = Math.round(data.daily.temperature_2m_min[i]);
                    const weatherCode = data.daily.weather_code[i];
                    const iconName = getWeatherIcon(weatherCode);
                    
                    const forecastItem = document.createElement('div');
                    forecastItem.className = 'forecast-item';
                    forecastItem.innerHTML = `
                        <div class="forecast-day">${dayName}</div>
                        <div class="forecast-icon">
                            <sl-icon name="${iconName}" style="font-size: 1.2rem;"></sl-icon>
                        </div>
                        <div class="forecast-temp">${minTemp}° | ${maxTemp}°</div>
                    `;
                    
                    forecastContainer.appendChild(forecastItem);
                }
            }
        } else {
            weatherElement.textContent = 'Weather data unavailable';
            document.querySelector('.weather-icon sl-icon').setAttribute('name', 'exclamation-triangle');
            forecastContainer.innerHTML = '<div>Forecast unavailable</div>';
        }
    } catch (error) {
        console.error("Error in fetchWeather:", error);
        weatherElement.textContent = 'Failed to fetch weather';
        document.querySelector('.weather-icon sl-icon').setAttribute('name', 'exclamation-triangle');
        forecastContainer.innerHTML = '<div>Forecast unavailable</div>';
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    updateDate();
    fetchWeather();
    // Update weather every hour
    setInterval(() => {
        updateDate();
        fetchWeather();
    }, 3600000);
});
