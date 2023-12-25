import { StyleSheet, Text, View } from "react-native";
import React from "react";
import dayjs from "dayjs";
import { BlurView } from "expo-blur";

const ForecastItem = ({ day }) => {
  return (
    <BlurView intensity={30} style={styles.container}>
      <Text style={styles.temp}>{Math.round(day.main.temp)}°</Text>
      <Text style={styles.date}>{dayjs(day.dt * 1000).format("ddd ha")}</Text>
    </BlurView>
  );
};

export default ForecastItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    aspectRatio: 9 / 16,
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
  },
  temp: {
    fontWeight: "bold",
    fontSize: 35,
    color: "white",
    marginVertical: 15,
  },
  date: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
});
