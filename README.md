<div id="weather-widget" class="weather-container">
    <sl-card class="weather-card">
        <!-- Header with date and refresh button -->
        <div slot="header" class="weather-header">
            <div class="header-left">
                <sl-icon name="calendar3"></sl-icon>
                <div id="date-display">Loading date...</div>
            </div>
            <sl-icon-button name="arrow-repeat" label="Refresh" size="small" onclick="fetchWeather()" class="refresh-button"></sl-icon-button>
        </div>

        <!-- Current weather -->
        <div class="weather-content">
            <div class="weather-icon">
                <sl-icon name="cloud-sun" style="font-size: 2.5rem;"></sl-icon>
            </div>
            <div id="weather-display" class="weather-info">Loading weather...</div>
        </div>

        <!-- 5-day forecast -->
        <div class="forecast-container" id="forecast-container">
            <!-- Forecast items will be added here by JavaScript -->
            <div class="forecast-loading">Loading forecast...</div>
        </div>
    </sl-card>
</div>

<style>
    .weather-container {
        position: fixed;
        top: 10px;
        right: 10px;
        width: 280px;
        z-index: 1000;
        transition: all 0.3s ease;
    }

    .weather-card {
        --border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .weather-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .header-left {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 500;
    }

    .refresh-button {
        font-size: 0.8rem;
    }

    .weather-content {
        display: flex;
        align-items: center;
        padding: 12px 0;
        border-bottom: 1px solid #f0f0f0;
    }

    .weather-icon {
        margin-right: 16px;
    }

    .weather-info {
        font-size: 0.9rem;
    }

    .forecast-container {
        display: flex;
        justify-content: space-between;
        padding: 12px 0 4px;
        overflow-x: auto;
    }

    .forecast-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 50px;
        text-align: center;
    }

    .forecast-day {
        font-size: 0.7rem;
        margin-bottom: 4px;
    }

    .forecast-icon {
        margin-bottom: 4px;
    }

    .forecast-temp {
        font-size: 0.7rem;
    }

    @media (max-width: 768px) {
        .weather-container {
            width: calc(100% - 20px);
            max-width: 350px;
        }
    }

    @media (max-width: 480px) {
        .weather-container {
            width: calc(100% - 20px);
            right: 50%;
            transform: translateX(50%);
            top: auto;
            bottom: 10px;
        }

        .weather-content {
            padding: 8px 0;
        }

        .forecast-container {
            padding: 8px 0 0;
        }

        .forecast-item {
            min-width: 40px;
        }
    }

    /* For very small screens */
    @media (max-width: 320px) {
        .weather-icon sl-icon {
            font-size: 2rem !important;
        }

        .forecast-icon sl-icon {
            font-size: 1rem !important;
        }

        .weather-info, .forecast-temp, .forecast-day {
            font-size: 0.7rem;
        }
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
        .weather-card {
            --sl-color-neutral-0: #1a1a1a;
            --sl-color-neutral-50: #242424;
            --sl-color-neutral-100: #2d2d2d;
            --sl-color-neutral-200: #363636;
            --sl-color-neutral-300: #444444;
            color: #f0f0f0;
        }

        .forecast-container {
            border-top-color: #444444;
        }

        .weather-content {
            border-bottom-color: #444444;
        }
    }
</style>



## [AWS Notes](./awz.md)
Collection of helpful AWS note and setup scripts

---

## [Swift UI](./swiftUI.md)
Swift UI notes

---









































<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/themes/light.css" />
<script type="module" src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/shoelace-autoloader.js"></script>
<script>
    const locationName = "65806";
    console.log("Fetching weather for: ", locationName);
</script>
<script src="./assets/js/weather.js"></script>
<script type="module" src="./assets/js/mermaid.js"></script>
