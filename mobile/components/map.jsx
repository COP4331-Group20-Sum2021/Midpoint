import React, { useState, useEffect } from "react";
// import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, ScrollView, TextInput} from "react-native";
import { Card, ListItem, Button, Icon, Overlay } from "react-native-elements";
import { useAuth } from "../context/AuthContext";
import MapView, { Marker, PROVIDER_GOOGLE, Circle, Callout } from "react-native-maps";

const colorMap = {
  restaurant: "red",
  amusement_park: "purple",
  aquarium: "purple",
  art_gallery: "purple",
  bakery: "red",
  bar: "red",
  beauty_salon: "orange",
  bicycle_store: "orange",
  book_store: "orange",
  bowling_alley: "purple",
  cafe: "red",
  campground: "green",
  car_dealer: "orange",
  car_rental: "orange",
  car_repair: "orange",
  car_wash: "orange",
  casino: "purple",
  clothing_store: "orange",
  convenience_store: "orange",
  department_store: "orange",
  electronics_store: "orange",
  florist: "orange",
  food: "red",
  furniture_store: "orange",
  gas_station: "orange",
  gym: "purple",
  hair_care: "orange",
  hardware_store: "orange",
  home_goods_store: "orange",
  jewelry_store: "orange",
  lodging: "purple",
  library: "purple",
  liquor_store: "orange",
  meal_delivery: "purple",
  meal_takeaway: "purple",
  movie_theater: "purple",
  museum: "purple",
  night_club: "purple",
  park: "green",
  pet_store: "purple",
  restaurant: "red",
  school: "yellow",
  shoe_store: "purple",
  shopping_mall: "orange",
  spa: "purple",
  stadium: "purple",
  store: "orange",
  supermarket: "orange",
  tourist_attraction: "purple",
  zoo: "purple",
  recreation: "green",
};

function IamTheMap({ midpoint, members, setFoundMidpoints, filter}) {
  const [establishments, setEstablishments] = useState();
  
  useEffect(() => {
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
      {members.map((member, i) => {
        return (
          <Marker
            coordinate={{ latitude: member.latitude, longitude: member.longitude }}
            pinColor='blue'
            
          >
            <Callout>
              <View>
                <Text style={{color: '#5F7595'}}>{member.firstname} {member.lastname}</Text>
              </View>
            </Callout>
          </Marker>
        );
      })}

      {establishments &&
          establishments.establishments.map((establishment, i) => {
            if (colorMap[establishment.type]) {
              return (
                <Marker
                  coordinate={{
                    latitude: establishment.latitude,
                    longitude: establishment.longitude,
                  }}
                  pinColor={colorMap[establishment.type]}
                  strokeWidth={100}
                >
                  <Callout>
                    <View>
                      <Text style={{color: '#5F7595'}}>{establishment.name}</Text>
                      <Text style={{color: '#5F7595'}}>{establishment.address}</Text>
                      <Text style={{color: '#5F7595'}}>★ {establishment.rating}</Text>
                    </View>
                  </Callout>
                </Marker>
              );
            } else {
              return (
                <Marker
                  coordinate={{
                    latitude: establishment.latitude,
                    longitude: establishment.longitude,
                  }}
                  pinColor='wheat'
                >
                  <Callout>
                    <View>
                      <Text style={{color: '#5F7595'}}>{establishment.name}</Text>
                      <Text style={{color: '#5F7595'}}>{establishment.address}</Text>
                      <Text style={{color: '#5F7595'}}>★ {establishment.rating}</Text>
                    </View>
                  </Callout>
                </Marker>
              )
            }
        })}

      <Circle
        center={{latitude: midpoint.latitude, longitude: midpoint.longitude}}
        radius={3000}
        strokeWidth={1}
        strokeColor={"#7E94B4"}
        fillColor={"rgba(0,0,120,0.4)"}
      />
    </MapView>
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

  const [addUserVisible, setaddUserGroupVisible] = useState(false);
  const [newUserEmail, onChangeText] = React.useState(undefined);
  //const [currentMemberId, setKickUser] = useState();

  

  const toggleOverlayAdd = () => {
    setaddUserGroupVisible(!addUserVisible);
  };

  function addMember(newEmail) {
    fetch("https://group20-midpoint.herokuapp.com/api/inviteparticipant", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.uid,
        userToken: user.Aa,
        email: newEmail,
        groupId: route.params.group.groupid,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

      // Close the overlay for add!
      toggleOverlayAdd();
  }

  function kickMember(memberid) {
    fetch("https://group20-midpoint.herokuapp.com/api/kickfromgroup", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ownerId: user.uid,
        userToken: user.Aa,
        userId: memberid,
        groupId: route.params.group.groupid,
      }),
    })
      .then((response) => {
        if (response.ok)
          setGroupData({...groupData, grouplocations: groupData.grouplocations.filter(member => member.userId !== memberid)})
        return response.json()
      })
      .then((data) => console.log(data));
  }

  function leaveCard() {
    fetch("https://group20-midpoint.herokuapp.com/api/removemyself", {
      method: "DELETE",
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
      .then((data) => console.log(data));
  }

  function deleteCard() {
    fetch("https://group20-midpoint.herokuapp.com/api/deletegroup", {
      method: "DELETE",
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
      .then((data) => console.log(data))
      .then((data) => checkOwnershipError(data))
      .then(() => setStale(!stale));
  }

  function checkOwnershipError(jsonResponse){
    if(jsonResponse.error === ""){
      navigation.pop();
    }
  }
  const toggleOverlayDelete = () => {
    setVisibleDelete(!visibleDelete);
  };

  const toggleOverlayLeave = () => {
    setVisibleLeave(!visibleLeave);
  };

  function deleteGroup(groupid) {
    console.log("deleting group ", groupid);
    toggleOverlayDelete();
    deleteCard();
  }

  function leaveGroup(groupid) {
    console.log("leaving group ", groupid);
    leaveCard();
    toggleOverlayLeave();
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
        setGroupData(data);
      });
  }, []);

  return (
    <>
      <ScrollView style={{backgroundColor: '#212C3D'}}>
        <View style={styles.mapContainer}>
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

        <Overlay isVisible={addUserVisible} onBackdropPress={toggleOverlayAdd} overlayStyle={styles.addOverlay}>
          <Text style={styles.overlayTitle}>Add New Member!</Text>
          <Text style={{
            fontSize: 15,
            marginBottom: 5,
          }}>Email</Text>
          <TextInput style={styles.input} placeholder="user@email.com" onChangeText={(text) => onChangeText(text)} />
          <Button icon={<Icon name="check" type="evilicon" color="#ffffff" />} buttonStyle={styles.acceptButton} title=" Yes." onPress={() => addMember(newUserEmail)} />
        </Overlay>

        <View style={styles.informationBlock}>
          <ScrollView nestedScrollEnabled>
            {foundMidpoints && <Text style={styles.midpointListTitle}>Found {foundMidpoints.establishments.length} Midpoints</Text>}
            {foundMidpoints &&
              foundMidpoints.establishments.map((establishment, i) => {
                return (
                  <View style={styles.innerBlock}>
                    <Text style={styles.text}>Name: {establishment.name}</Text>
                    <Text style={styles.text}>Address: {establishment.address}</Text>
                    <Text style={styles.text}>Rating: {establishment.rating}</Text>
                  </View>
                );
            })}
          </ScrollView>
        </View>

        <View style={{
          height: 45,
          backgroundColor: 'white',
          flex: 1,
          justifyContent: 'center'
        }}>
          <Text style={{
            color: '#283549',
            textAlign: 'center',
            fontSize: 30,
          }}>⬍</Text>
        </View>

        <View style={styles.informationBlock}>
          <ScrollView nestedScrollEnabled>
            <Text style={styles.midpointListTitle}>List of Members</Text>
            {groupData &&
              groupData.grouplocations.map((member, i) => {
                return (
                  <View style={styles.innerBlock}>
                    <Text style={styles.text}>Name: {member.firstname} {member.lastname}</Text>
                    <Text style={styles.text}>Email: {member.email}</Text>
                    {user.uid === member.userId ? (
                      <View>
                        <Button icon={<Icon name="minus" type="evilicon" color="#ffffff" />} buttonStyle={styles.leaveMemberButton} title=" Leave" onPress={() => toggleOverlayLeave()} />
                      </View>
                      ) : (
                        <View>
                        <Button icon={<Icon name="minus" type="evilicon" color="#ffffff" />} buttonStyle={styles.leaveMemberButton} title=" Kick" onPress={() => kickMember(member.userId)} />
                      </View>
                      )}
                  </View>
                );
            })}
          </ScrollView>
        </View>

        <View style={{
          height: 45,
          backgroundColor: 'white',
          flex: 1,
          justifyContent: 'center'
        }}>
          <Text style={{
            color: '#283549',
            textAlign: 'center',
            fontSize: 30,
          }}>⬍</Text>
        </View>

        <View>
          <Button icon={<Icon name="plus" type="evilicon" color="#ffffff" />} buttonStyle={styles.acceptButton} title=" Add User" onPress={() => toggleOverlayAdd()} />
          <Button icon={<Icon name="arrow-left" type="evilicon" color="#ffffff" />} buttonStyle={styles.backButton} title=" Back to Groups" onPress={() => navigation.pop()} />
          <Button icon={<Icon name="minus" type="evilicon" color="#ffffff" />} buttonStyle={styles.leaveButton} title=" Leave Group" onPress={() => toggleOverlayLeave()} />
          <Button icon={<Icon name="trash" type="evilicon" color="#ffffff" />} buttonStyle={styles.leaveButton} title=" Delete Group" onPress={() => toggleOverlayDelete()} />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    height: 460,
  },
  informationBlock: {
    textAlign: "center",
    maxHeight: 250,
  },
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: '100%',
    height: '100%',
  },
  leaveMemberButton : {
    backgroundColor: "red",
    marginBottom: 5,
    marginTop: 5,
  },
  declineOverlay: {
    paddingBottom: 30,
  },
  overlayTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
    marginBottom: 10,
  },
  midpointListTitle : {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    padding: 5,
    backgroundColor: '#212C3D',
    color: 'white',
  },
  innerBlock : {
    padding : 5,
    textAlign: "center",
    backgroundColor: '#364761',
    borderColor: '#212C3D',
    borderWidth: 1,
  },
  text: {
    color: 'white',
  },
  acceptButton: {
    backgroundColor: "#61955f",
    height: 60,
    borderColor: 'black',
    marginBottom: 5,
  },
  leaveButton: {
    backgroundColor: "red",
    height: 60,
    borderColor: 'black',
    marginBottom: 5,
  },
  backButton : {
    backgroundColor : "blue",
    height: 60,
    borderColor: 'black',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    width: '100%',
    marginBottom: 10,
  },
  addOverlay : {
    width: '95%',
    paddingVertical: 20,
  },
});
