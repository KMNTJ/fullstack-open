import axios from "axios";

const api_key = import.meta.env.VITE_WEATHERKEY

const foo2 = async () => {
  const request = axios.get(
    `https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${api_key}`
  );
  const response = await request;
  return response.data;
};

const foo3 = async () => {
  const request = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${api_key}`
  );
  const response = await request;
  return response.data;
};

export default {
  foo2,
  foo3,
};
