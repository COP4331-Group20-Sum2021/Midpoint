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
        <Marker 
          coordinate={{ latitude: profile.latitude, longitude: profile.longitude }}
          pinColor='blue'
        />
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
          <View style={styles.avatarContainer}>
            <Avatar size="large" rounded title={FI} containerStyle={styles.avatar} />
          </View>
          <Text style={styles.userInfo}>First Name: <Text style={styles.text}>{profile.firstname}</Text></Text>
          <Text style={styles.userInfo}>Last Name: <Text style={styles.text}>{profile.lastname}</Text></Text>
          <Text style={styles.userInfo}>Email: <Text style={styles.text}>{profile.email}</Text></Text>
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
    backgroundColor: "#212C3D",
    paddingBottom: 10,
    borderColor: "#ffffff",
    textAlign: "center",
    paddingHorizontal: 10,
  },
  userInfo: {
    textAlign: "left",
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
  },
  avatarContainer: {
    alignItems: 'center',
  },
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    height: '100%',
    width: '100%',
  },
  avatar: {
    backgroundColor: "#364761",
    marginBottom: 20,
    marginTop: 10,
    justifyContent: 'center'
  },
  text: {
    textDecorationLine: "underline",
  }
});
