import React from "react";
import { View, Text, StyleSheet } from "react-native";

const WeatherNotification = ({ message }) => {
  return (
    <View style={styles.notificationContainer}>
      <Text style={styles.notificationText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    padding: 10,
    backgroundColor: "#FFDD57",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  notificationText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});

export default WeatherNotification;
