import axios from "axios";

const api_key = import.meta.env.VITE_WEATHERKEY;

const getCityInformation = (countryCode, capital, stateCode) => {
  const request = axios.get(
    `https://api.openweathermap.org/geo/1.0/direct?q=${capital},${stateCode},${countryCode}&limit=1&appid=${api_key}`
  );
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.error(
        "An error occurred while fetching city information:",
        error
      );
    });
};

const getCityInformation2 = (capital) => {
  const request = axios.get(
    `https://api.openweathermap.org/geo/1.0/direct?q=${capital}&limit=1&appid=${api_key}`
  );
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.error(
        "An error occurred while fetching city information:",
        error
      );
    });
};

const getWeatherByCoordinates = (lat, lon) => {
  const request = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`
  );
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.error(
        "An error occurred while fetching city information:",
        error
      );
    });
};

export default {
  getCityInformation,
  getCityInformation2,
  getWeatherByCoordinates,
};
