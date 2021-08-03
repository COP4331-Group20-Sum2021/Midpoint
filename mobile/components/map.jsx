import React, { useState, useEffect } from "react";
// import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, ScrollView} from "react-native";
import { Card, ListItem, Button, Icon, Overlay } from "react-native-elements";
import { useAuth } from "../context/AuthContext";
import MapView, { Marker, PROVIDER_GOOGLE, Circle} from "react-native-maps";

function IamTheMap({ midpoint, members, setFoundMidpoints, filter}) {
  const [establishments, setEstablishments] = useState();
  
  useEffect(() => {
    console.log(midpoint);
    fetch("https://group20-midpoint.herokuapp.com/api/getestablishments", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        latitude: midpoint.latitude,
        longitude: midpoint.longitude,
        filters: filter,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setEstablishments(data);
        setFoundMidpoints(data);
      });
  }, [filter]);


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
        {members.map((member) => {
          return (
            <Marker
              coordinate={{ latitude: member.latitude, longitude: member.longitude }}
            >
            </Marker>
          );
        })}

        {establishments &&
            establishments.establishments.map((establishment) => {
              return (
                <Marker
                  coordinate={{
                    latitude: establishment.latitude,
                    longitude: establishment.longitude,
                  }}
                />
              );
          })}

        <Circle
          center={{latitude: midpoint.latitude, longitude: midpoint.longitude}}
          radius={3000}
          strokeWidth={1}
          strokeColor={"#7E94B4"}
          fillColor={"rgba(0,0,255,0.3)"}
        />
      </MapView>
    </View>
  );
}

// To get groupdata, do route.params.group.<dataYouNeed>
// Idk why you have to do this but it works pog.
export default function Map({ route, navigation }) {
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visibleLeave, setVisibleLeave] = useState(false);
  
  const [establishments, setEstablishments] = useState();
  const [foundMidpoints, setFoundMidpoints] = useState();

  const [groupData, setGroupData] = useState(null);

  const [filter, setFilter] = useState();
  const [members, setMembers] = useState([]);

  const { user } = useAuth();
  // const [establishments, setEstablishments] = useState(undefined);

  console.log("Route Group data: ",route.params.group);

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

  useEffect(() => {
    fetch("https://group20-midpoint.herokuapp.com/api/retrievegroupdata", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.uid,
        userToken: user.Aa,
        groupId: route.params.group.groupid,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setGroupData(data);
      });
  }, []);


  return (
    <>
      <ScrollView>
        <View>

        {groupData && (
          <IamTheMap midpoint={groupData.midpoint} members={groupData.grouplocations} filter={""} setFoundMidpoints={setFoundMidpoints}/>
        )}

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
          <Text style={styles.midpointListTitle}>List of Midpoints</Text>
          {foundMidpoints &&
            foundMidpoints.establishments.map((establishment) => {
              console.log(establishment.name);
              return (
                <View style={styles.placeBlock}>
                    <View style={styles.innerBlock}>
                      <Text>Name: {establishment.name}</Text>
                      <Text>Address: {establishment.address}</Text>
                      <Text>Rating: {establishment.rating}</Text>
                    </View>
                </View>
              );
          })}
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
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  informationBlock: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    marginBottom: 20,
    borderColor: "#000000",
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
  placeBlock : {
    height: Dimensions.get("window").height / 8,
    borderWidth: 2,
    backgroundColor: "#ffffff",
    borderTopWidth: 2,
    borderBottomWidth : 0,

  },
  midpointListTitle : {
    color : "#000000",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  innerBlock : {
    marginTop : 15,
  }
});
