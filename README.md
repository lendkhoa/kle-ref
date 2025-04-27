<div id="weather-widget" style="position: absolute; top: 10px; right: 10px; background-color: rgba(240, 240, 240, 0.8); padding: 10px; border-radius: 5px; font-size: 0.8em; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
  <div id="date-display">Loading date...</div>
  <div id="weather-display">Loading weather...</div>
</div>

## [AWS Notes](./awz.md)
Collection of helpful AWS note and setup scripts

---

## [Swift UI](./swiftUI.md)
Swift UI notes

---









































<script>
  // Update date daily
  function updateDate() {
    const dateElement = document.getElementById('date-display');
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    dateElement.textContent = new Date().toLocaleDateString(undefined, options);
  }
  
  // Fetch weather data
  async function fetchWeather() {
    const weatherElement = document.getElementById('weather-display');
    try {
      // Get user location (browser will ask for permission)
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        
        // Free weather API that doesn't require API key
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature,weather_code,wind_speed_10m`);
        const data = await response.json();
        
        // Display temperature and weather information
        if (data && data.current) {
          const temp = data.current.temperature;
          const weatherCode = data.current.weather_code;
          const weather = getWeatherDescription(weatherCode);
          
          weatherElement.innerHTML = `${temp}°C - ${weather}`;
        } else {
          weatherElement.textContent = 'Weather data unavailable';
        }
      }, (error) => {
        weatherElement.textContent = 'Location access denied';
      });
    } catch (error) {
      weatherElement.textContent = 'Failed to fetch weather';
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
</script>

<script type="module">
    import * as mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11.6.0/dist/mermaid.min.js';
    mermaid.initialize({
        startOnLoad: true,
        theme: 'dark'
    });
</script>
