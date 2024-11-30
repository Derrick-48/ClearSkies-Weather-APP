import React, { useState, useEffect } from "react";
import { View, StyleSheet, Platform } from "react-native";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import WeatherDisplay from "../constants/components/weatherDisplay";
import WeatherLoading from "../constants/components/weatherLoading";
import WeatherNotification from "../constants/components/weatherNotification";
import { fetchWeatherData } from "../constants/utils/weatherServices";
import { sendWeatherNotification } from "../constants/utils/notificationServices";

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const WeatherApp = () => {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // Fetch user location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

  // Fetch weather data based on location
  useEffect(() => {
    if (location) {
      fetchWeatherData(
        location.coords.latitude,
        location.coords.longitude,
        setWeatherData,
        setIsLoading
      );
    }
  }, [location]);

  // Check weather data and set notifications
  useEffect(() => {
    if (weatherData) {
      const condition = weatherData.weather[0].main;
      const newNotification = sendWeatherNotification(condition);
      setNotification(newNotification);
    }
  }, [weatherData]);

  // Register for notifications and trigger welcome message
  useEffect(() => {
    const registerAndSendNotification = async () => {
      const token = await registerForPushNotificationsAsync();

      if (token) {
        console.log("Push token registered:", token);

        await Notifications.scheduleNotificationAsync({
          content: {
            title: "👋 Welcome to ClearSkies!",
            body: "Have a happy day!",
            sound: true,
          },
          trigger: null, // Immediate
        });
      }
    };

    registerAndSendNotification();
    scheduleDailyNotifications();
  }, []);

  // Function to register for push notifications
  const registerForPushNotificationsAsync = async () => {
    try {
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "Default",
          importance: Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }

      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        alert("Failed to get notification permissions!");
        return null;
      }

      const token = (await Notifications.getExpoPushTokenAsync()).data;
      return token;
    } catch (error) {
      console.error("Error registering for notifications:", error);
      alert("Error registering for notifications. Check console for details.");
      return null;
    }
  };

  // Function to schedule daily notifications
  const scheduleDailyNotifications = async () => {
    try {
      // Morning notification at 6 AM
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "🌅 Good Morning!",
          body: "Start your day with positivity and check today's weather!",
          sound: true,
        },
        trigger: {
          hour: 6,
          minute: 0,
          repeats: true,
        },
      });

      // Evening notification at 6 PM
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "🌇 Good Evening!",
          body: "Wind down your day with a quick weather update!",
          sound: true,
        },
        trigger: {
          hour: 18,
          minute: 0,
          repeats: true,
        },
      });

      console.log("Daily notifications scheduled.");
    } catch (error) {
      console.error("Error scheduling daily notifications:", error);
      alert("Error scheduling notifications. Check console for details.");
    }
  };

  // Show loading screen while fetching data
  if (isLoading) {
    return <WeatherLoading />;
  }

  return (
    <View style={styles.container}>
      {notification && <WeatherNotification message={notification} />}
      <WeatherDisplay weatherData={weatherData} />
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

export default WeatherApp;
