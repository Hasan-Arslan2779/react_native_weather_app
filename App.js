import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import axios from "axios";
import ForecastItem from "./components/ForecastItem";
import { createStackNavigator } from "@react-navigation/stack";
import LottieView from "lottie-react-native";

const Stack = createStackNavigator();

const APİ_KEY = "81ef475e84e9eee89efb8da4c9f1083a";
const BASE_URL = `https://api.openweathermap.org/data/2.5`;
const bgImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/1.jpg";

// api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}

const App = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [forcast, setForcast] = useState(null);

  useEffect(() => {
    if (location) {
      fetchWeather();
      fetchForecast();
    }
  }, [location]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  const fetchWeather = async () => {
    if (!location) {
      return;
    }

    const results = await axios(
      `${BASE_URL}/weather?lat=36,9468&lon=37,4617&appid=${APİ_KEY}&units=metric`
    );
    const data = await results.data;
    setWeather(data);
  };

  const fetchForecast = async () => {
    const results = await axios(
      `${BASE_URL}/forecast?lat=36,9468&lon=37,4617&appid=${APİ_KEY}&units=metric`
    );
    const dataFor = await results.data;
    setForcast(dataFor.list);

    if (!location) {
      return;
    }
  };

  if (!weather) {
    return <ActivityIndicator color={"red"} />;
  }

  return (
    <ImageBackground
      source={{
        uri: bgImage,
      }}
      resizeMode="stretch"
      style={styles.container}
    >
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      />
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={styles.location}>{weather.name}</Text>
        <Text style={styles.temp}>{Math.round(weather.main.temp)}°</Text>
        <Text style={styles.location}>{weather.weather[0].main}</Text>
        <LottieView
          source={
            weather.weather[0].main === "Rain"
              ? require("./Lotie-Animaton/rainy.json")
              : require("./Lotie-Animaton/cloud.json")
          }
          style={{ width: 200, aspectRatio: 1 }}
          autoPlay
          loop
        />
      </View>
      <FlatList
        data={forcast}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0, height: 200, marginBottom: 40 }}
        contentContainerStyle={{
          gap: 10,
          paddingHorizontal: 10,
        }}
        renderItem={({ item }) => <ForecastItem day={item} />}
      />
    </ImageBackground>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "gray",
  },
  location: {
    fontSize: 30,
    fontStyle: "italic",
    color: "white",
  },
  temp: {
    fontWeight: "900",
    fontSize: 100,
    color: "white",
  },
});
