
    const form = document.getElementById('location-form');
    const input = document.getElementById('location-input');
    const weatherResults = document.getElementById('weather-results');
    
    form.addEventListener('submit', function(event) {
      event.preventDefault();
    
      const location = input.value;
    
      if (location.trim() === '') {
        alert('Please enter a valid location.');
        return;
      }
    
      const apiKey = 'e02bec7854f244c3b4795332230407'; 
    
      axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=1`)
        .then(function(response) {
          const forecast = response.data;
          const currentWeather = forecast.current;
    
          let html = `
            <h2>${forecast.location.name}, ${forecast.location.country}</h2>
            <div class="forecast-day">
              <h3>${forecast.forecast.forecastday[0].date}</h3>
              <p><strong>Condition:</strong> ${currentWeather.condition.text}</p>
              <p><strong>Temperature:</strong> ${currentWeather.temp_c}°C</p>
              <p><strong>Feels Like:</strong> ${currentWeather.feelslike_c}°C</p>
              <p><strong>Humidity:</strong> ${currentWeather.humidity}%</p>
              <p><strong>Wind:</strong> ${currentWeather.wind_kph} km/h</p>
              <p><strong>Precipitation:</strong> ${currentWeather.precip_mm} mm</p>
              <p><strong>UV Index:</strong> ${currentWeather.uv}</p>
              <p><strong>Sunrise:</strong> ${forecast.forecast.forecastday[0].astro.sunrise}</p>
              <p><strong>Sunset:</strong> ${forecast.forecast.forecastday[0].astro.sunset}</p>
            </div>
          `;
    
          weatherResults.innerHTML = html;
          weatherResults.style.display = 'block';
        })
        .catch(function(error) {
          console.log(error);
          weatherResults.innerHTML = '<p>An error occurred while fetching the weather forecast. Please try again later.</p>';
          weatherResults.style.display = 'block';
        });
    });
    