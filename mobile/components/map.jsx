import React, { useState, useEffect } from "react";
// import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Card, ListItem, Button, Icon, Overlay } from "react-native-elements";

import { useAuth } from "../context/AuthContext";
const OverlayExample = () => {
  const [visible, setVisible] = useState(false);
};
const toggleOverlay = () => {
  setVisible(!visible);
};
// To get groupdata, do route.params.group.<dataYouNeed>
// Idk why you have to do this but it works pog.
export default function Map({ route }) {
  return (
    <>
      <View>
        <Text>{route.params.group.groupname}</Text>
      </View>
      <View>
        <Text>This is the map frame</Text>
      </View>
      <View>
        <Text>This is the midpoint list</Text>
      </View>
      <View>
        <Text>This is the members list</Text>
      </View>
      <View>
        <Text>This is the CRUD Buttons</Text>
        <Button style={styles.acceptButton} title="Leave Group" />
        <Button style={styles.acceptButton} title="Delete Group" />
      </View>
      <View>
        <Button title="Open Overlay" onPress={toggleOverlay} />

        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <Text>Hello from Overlay!</Text>
        </Overlay>
      </View>
    </>
  );
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
  acceptButton: {
    backgroundColor: "#61955f",
    borderWidth: 5,
    borderRadius: 15,
    marginBottom: 10,
    borderColor: "#ffffff",
  },
});
