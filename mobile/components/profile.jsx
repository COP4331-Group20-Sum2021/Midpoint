import { Card, ListItem, Button, Icon, Overlay, Avatar } from "react-native-elements";
import { Text, View, StyleSheet, ScrollView, Dimensions, RefreshControl } from "react-native";
import { useAuth } from "../context/AuthContext";
import React, { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

function IamTheMap({ profile }) {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: profile.latitude,
          longitude: profile.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude: profile.latitude, longitude: profile.longitude }}></Marker>
      </MapView>
    </View>
  );
}

function InfoDisplay({ profile }) {
  let fnameInitial = profile.firstname.substring(0, 1);
  let lnameInitial = profile.lastname.substring(0, 1);
  let FI = fnameInitial + lnameInitial;
  return (
    <>
      <View style={styles.informationBlock}>
        <View style={styles.userInfo}>
          <Avatar size="small" rounded title={FI} onPress={() => console.log("Works!")} containerStyle={styles.avatar} />
          <Text style={styles.userInfo}>First Name: {profile.firstname}</Text>
          <Text style={styles.userInfo}>Last Name: {profile.lastname}</Text>
          <Text style={styles.userInfo}>Email: {profile.email}</Text>
          <Text style={styles.userInfo}>Latitude: {profile.latitude}</Text>
          <Text style={styles.userInfo}>Longitude: {profile.longitude}</Text>
        </View>
      </View>
      <View>
        <IamTheMap profile={profile} />
      </View>
    </>
  );
}

export default function Profile() {
  const { user, location } = useAuth();
  const [profile, setProfile] = useState(undefined);
  React.useEffect(() => {
    // navigator.geolocation.getCurrentPosition(success, null, { enableHighAccuracy: true });
    fetch("https://group20-midpoint.herokuapp.com/api/getuserdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user.uid }),
    })
      .then((res) => res.json())
      .then((j) => setProfile(j))
      .then(console.log(user));
  }, []);

  return <>{profile ? <InfoDisplay profile={profile} /> : <Text> Generating Profile... </Text>}</>;
}

const styles = StyleSheet.create({
  informationBlock: {
    backgroundColor: "#9FB3D1",
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 10,
    borderColor: "#ffffff",
    textAlign: "center",
    height: Dimensions.get("window").height / 3,
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
  avatar: {
    backgroundColor: "gray",
  },
});
