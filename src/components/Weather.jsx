import { useState, useEffect } from "react";

const Weather = () => {
  const [location, setLocation] = useState({});
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  async function fetchWeather() {
    const timestamp = Date.now();

    let cachedIP = null;
    try {
      cachedIP = JSON.parse(localStorage.getItem("ipData"));
    } catch {
      // ignore
    }

    let location = null;
    if (cachedIP && timestamp - cachedIP.timestamp < 5 * 60 * 1000) {
      location = { city: cachedIP.city, country_name: cachedIP.country_name };
    } else {
      const { city, country_name } = await fetch("https://ipapi.co/json")
        .then((x) => x.json())
        .catch();
      location = { city, country_name };
      localStorage.setItem(
        "ipData",
        JSON.stringify({ timestamp, city, country_name })
      );
    }

    let cachedWeather = null;
    try {
      cachedWeather = JSON.parse(localStorage.getItem("weatherData"));
    } catch {
      // ignore
    }

    if (
      cachedWeather &&
      location.city === cachedWeather.location.city &&
      timestamp - cachedWeather.timestamp < 15 * 60 * 1000
    ) {
      return {
        location: cachedWeather.location,
        weather: cachedWeather.weather,
      };
    }

    const url = `https://devdashboard.vercel.app/api/weather?city=${location.city}`;

    try {
      const req = await fetch(url);
      if (!req.ok) throw new Error(req.status);
      const weather = await req.json();

      localStorage.setItem(
        "weatherData",
        JSON.stringify({
          timestamp,
          location,
          weather,
        })
      );

      return { location, weather };
    } catch (error) {
      if (cachedWeather) {
        console.warn("Weather fetch failed. Using stored data");
        return {
          location: cachedWeather.location,
          weather: cachedWeather.weather,
        };
      }
      throw error;
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const { location, weather } = await fetchWeather();
        setLocation(location);
        setWeather(weather);
      } catch (error) {
        setErrorMessage(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div className="module weather-module">
      {isLoading ? (
        "Loading module..."
      ) : errorMessage ? (
        { errorMessage }
      ) : (
        <>
          <div className="weather-current">
            <img
              src={weather.current.condition.icon}
              alt="Weather icon"
              className="weather-icon"
            />

            <span className="weather-temp weather-span">
              {weather.current.temp_c}
            </span>

            <span className="weather-condition weather-span">
              {weather.current.condition.text}
            </span>
          </div>

          <span className="city weather-span">
            {location.city}, {location.country_name}
          </span>
        </>
      )}
    </div>
  );
};

export default Weather;
