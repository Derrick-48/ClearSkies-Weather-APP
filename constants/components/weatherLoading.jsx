import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

const WeatherLoading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#000" />
      <Text>Fetching weather data...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default WeatherLoading;
