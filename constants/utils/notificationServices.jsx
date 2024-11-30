// Function to create a weather-based notification
export const sendWeatherNotification = (condition) => {
  switch (condition) {
    case "Clear":
      return "It's sunny outside! Time to enjoy the sunshine! ☀️";
    case "Clouds":
      return "It's a bit cloudy today. You might want to bring a jacket! ☁️";
    case "Rain":
      return "It's raining! 🌧️ Remember to carry an umbrella.";
    case "Snow":
      return "It's snowing! ❄️ Stay warm and safe!";
    default:
      return "The weather is looking good today! 🌤️ Enjoy your day!";
  }
};
