import axios from "axios";

const WEATHER_API_KEY = "429cf2e5f2f0b0bf93119c7704e415e2";
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";

// Function to fetch weather data
export const fetchWeatherData = async (
  lat,
  lon,
  setWeatherData,
  setIsLoading
) => {
  try {
    const response = await axios.get(WEATHER_API_URL, {
      params: {
        lat,
        lon,
        appid: WEATHER_API_KEY,
        units: "metric", // Temperature in Celsius
      },
    });

    setWeatherData(response.data);
    setIsLoading(false);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    setIsLoading(false);
  }
};
