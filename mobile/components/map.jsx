import React, { useState, useEffect } from "react";
// import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import { Card, ListItem, Button, Icon, Overlay } from "react-native-elements";
import { useAuth } from "../context/AuthContext";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

function IamTheMap({ midpoint, members, establishments }) {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: midpoint.latitude,
          longitude: midpoint.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude: midpoint.latitude, longitude: midpoint.longitude }}></Marker>
        <Marker coordinate={{ latitude: midpoint.latitude + 2, longitude: midpoint.longitude - 5 }}></Marker>
      </MapView>
    </View>
  );
}

// To get groupdata, do route.params.group.<dataYouNeed>
// Idk why you have to do this but it works pog.
export default function Map({ route, navigation }) {
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visibleLeave, setVisibleLeave] = useState(false);

  const [midpoint, setMidpoint] = useState({ latitude: 28, longitude: -81 });
  const [members, setMembers] = useState([]);
  const [establishments, setEstablishments] = useState(undefined);

  const toggleOverlayDelete = () => {
    setVisibleDelete(!visibleDelete);
  };

  const toggleOverlayLeave = () => {
    setVisibleLeave(!visibleLeave);
  };

  function deleteGroup(groupid) {
    console.log("deleting group ", groupid);
  }

  function leaveGroup(groupid) {
    console.log("leaving group ", groupid);
  }

  function leavePop() {
    console.log("we are in leavePop");
    leaveGroup(route.params.group.groupid);
    navigation.pop();
  }

  return (
    <>
      <ScrollView>
        <View>
          <IamTheMap midpoint={midpoint} members={members} establishments={establishments} />
        </View>
        <Overlay isVisible={visibleDelete} onBackdropPress={toggleOverlayDelete} overlayStyle={styles.declineOverlay}>
          <Text style={styles.overlayTitle}>Are you sure you want to delete the group?</Text>

          <Button
            icon={<Icon name="check" type="evilicon" color="#ffffff" />}
            buttonStyle={styles.declineButton}
            title=" Yes."
            onPress={() => deleteGroup(route.params.group.groupid)}
          />
        </Overlay>

        <Overlay isVisible={visibleLeave} onBackdropPress={toggleOverlayLeave} overlayStyle={styles.declineOverlay}>
          <Text style={styles.overlayTitle}>Are you sure you want to leave the group?</Text>
          <Button icon={<Icon name="check" type="evilicon" color="#ffffff" />} buttonStyle={styles.declineButton} title=" Yes." onPress={() => leavePop()} />
        </Overlay>

        <View style={styles.informationBlock}>
          <ScrollView>
            <Text style={styles.userInfo}>{route.params.group.groupname}</Text>
            <Text style={styles.userInfo}>{route.params.group.groupname}</Text>
            <Text style={styles.userInfo}>{route.params.group.groupname}</Text>
            <Text style={styles.userInfo}>{route.params.group.groupname}</Text>
            <Text style={styles.userInfo}>{route.params.group.groupname}</Text>
            <Text style={styles.userInfo}>{route.params.group.groupname}</Text>
            <Text style={styles.userInfo}>{route.params.group.groupname}</Text>
          </ScrollView>
        </View>
        <View>
          <Text>This is the midpoint list</Text>
        </View>
        <View>
          <Text>This is the members list</Text>
        </View>
        <View>
          <Text>This is the CRUD Buttons</Text>
          <Button style={styles.declineButton} title="Leave Group" onPress={toggleOverlayLeave} />
          <Button style={styles.declineButton} title="Delete Group" onPress={toggleOverlayDelete} />
          <Button style={styles.declineButton} title="Back to Groups" onPress={() => navigation.pop()} />
        </View>
        <View></View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  informationBlock: {
    backgroundColor: "#9FB3D1",
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 10,
    borderColor: "#ffffff",
    textAlign: "center",
    height: Dimensions.get("window").height / 6,
  },
  userInfo: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
  },
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2,
  },
  declineButton: {
    backgroundColor: "#61955f",
    borderWidth: 5,
    borderRadius: 15,
    marginBottom: 10,
    borderColor: "#ffffff",
  },
  declineOverlay: {
    height: 180,
  },
  overlayTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
    marginBottom: 40,
  },
});
