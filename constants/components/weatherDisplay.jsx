import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const WeatherDisplay = ({ weatherData }) => {
  const { weather, main, name } = weatherData;
  const weatherCondition = weather[0].main;
  const animation = getWeatherAnimation(weatherCondition);
  const backgroundColor = getBackgroundColor(weatherCondition);
  const suggestion = getSuggestion(weatherCondition);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.cityName}>{name}</Text>
      <Text style={styles.temperature}>{`${Math.round(main.temp)}°C`}</Text>
      {animation && (
        <LottieView source={animation} autoPlay loop style={styles.animation} />
      )}
      <Text style={styles.suggestion}>{suggestion}</Text>
    </View>
  );
};

// Get the background color based on weather condition
const getBackgroundColor = (weatherCondition) => {
  switch (weatherCondition) {
    case "Clear":
      return "#FDB813"; // Sunny yellow
    case "Clouds":
      return "#D3D3D3"; // Cloudy grey
    case "Rain":
      return "#4A90E2"; // Rainy blue
    case "Snow":
      return "#FFFFFF"; // Snowy white
    default:
      return "#BCC6CC"; // Default neutral color
  }
};

// Get the animation for the weather condition
const getWeatherAnimation = (weatherCondition) => {
  switch (weatherCondition) {
    case "Clear":
      return require("../../assets/animation/sunny.json");
    case "Clouds":
      return require("../../assets/animation/sunny.json");
    case "Rain":
      return require("../../assets/animation/sunny.json");
    case "Snow":
      return require("../../assets/animation/sunny.json");
    default:
      return require("../../assets/animation/sunny.json");
  }
};

// Get weather suggestion based on condition
const getSuggestion = (weatherCondition) => {
  switch (weatherCondition) {
    case "Clear":
      return "☀️ It's sunny outside! 😎 Wear sunglasses and stay hydrated. 🥤";
    case "Clouds":
      return "☁️ It's cloudy today. 🧥 A light jacket might be helpful.";
    case "Rain":
      return "🌧️ It's raining. 🌂 Don't forget to take an umbrella!";
    case "Snow":
      return "❄️ It's snowing! 🧣 Dress warmly and stay safe. 🧤";
    default:
      return "🌈 Weather is unpredictable. Be prepared for anything! 🔄";
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cityName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  temperature: {
    fontSize: 28,
    fontWeight: "300",
    color: "#333",
    marginBottom: 20,
  },
  animation: {
    width: 200,
    height: 200,
  },
  suggestion: {
    fontSize: 18,
    fontWeight: "400",
    color: "#555",
    marginTop: 20,
    textAlign: "center",
    paddingHorizontal: 10,
  },
});

export default WeatherDisplay;
