import React, { useState, useEffect } from "react";
// import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function App() {
  return <View style={styles.container}>{/* <MapView style={styles.map} /> */}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
