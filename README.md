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
    const weatherLocationName = "{{ site.weather_location | default: 'San Francisco'}}";
    console.log("Fetching weather for: ", weatherLocationName);
</script>

<script type="module" src="./assets/js/mermaid.js"></script>
