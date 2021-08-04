import React, { useState, useEffect } from "react";
import { Card, ListItem, Button, Icon, Overlay } from "react-native-elements";
import { Text, View, StyleSheet, ScrollView, Dimensions, RefreshControl, TextInput } from "react-native";
import { useAuth } from "../context/AuthContext";
import { createStackNavigator } from "@react-navigation/stack";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

function Cards({ isGroup, setPage, invalidate, navigation }) {
  console.log(isGroup);
  let cards =
    isGroup &&
    isGroup.map((group, i) => {
      var cid = "card" + i;

      console.log(isGroup[i]);
      console.log(setPage);
      return (
        <Card id={cid} key={i}>
          <Card.Title>{group.groupname}</Card.Title>
          <Card.Divider />
          <Text style={{fontSize: 20, textAlign: 'center'}}>{group.participants.length === 1 ? <Text>{group.participants.length} Member</Text> : <Text>{group.participants.length} Members</Text>}</Text>
          <Button buttonStyle={styles.acceptButton} onPress={() => navigation.push("Map", { group: group, testing: "gang" })} title="Visit Midpoint Map" />
        </Card>
      );
    });

  if (cards === false) {
    return (
      <>
        <Text>You currently have no groups. Please click "Create New" or visit the invitations page.</Text>
      </>
    );
  }

  return (
    <View className="wrapper" id="wrapper">
      {cards}
    </View>
  );
}

function changePage() {
  return <Map />;
}

export default function Groups({ navigation }) {
  const [newGroupName, createNewGroupName] = useState();
  const [stale, setStale] = useState(false); // dont care about value, only care if this changed. This changing re renders the cards
  const [groupInfo, setGroupInfo] = useState(undefined);
  const [isGroup, setIsGroup] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isCrud, setCrud] = useState(0);
  const { user, location } = useAuth();
  const [refreshing, setRefreshing] = React.useState(false);

  const [groupname, onChangeText] = React.useState(undefined);

  const [visible, setVisible] = useState(false);

  // Make Modal visible or invisible
  const toggleOverlay = () => {
    console.log("Toggle ooga booga ");
    setVisible(!visible);
  };

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    populateGroups();
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const invalidate = () => {
    setTimeout(() => {
      setStale(!stale);
    }, 250);
  };

  function populateGroups() {
    fetch("https://group20-midpoint.herokuapp.com/api/listgroups", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.uid,
        userToken: user.Aa,
      }),
    })
      .then((response) => response.json())
      .then((data) => setIsGroup(data.groupdata));
  }

  useEffect(() => {
    async function run() {
      const res = await fetch("https://group20-midpoint.herokuapp.com/api/listgroups", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.uid,
          userToken: user.Aa,
        }),
      });
      const j = await res.json();

      if (res.ok) {
        console.log(j);
        setIsGroup(j.groupdata);
      }
    }
    run();
  }, [stale]);

  function createCard(groupname) {
    fetch("https://group20-midpoint.herokuapp.com/api/creategroup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.uid,
        userToken: user.Aa,
        groupname: groupname,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(() => setStale(!stale));
    toggleOverlay();
  }

  return (
    <>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={styles.declineOverlay}>
        <Text style={styles.overlayTitle}>Create a group!</Text>
        <Text>Group Name: </Text>
        <TextInput style={styles.input} placeholder="new group name" onChangeText={(text) => onChangeText(text)} />
        <Button icon={<Icon name="check" type="evilicon" color="#ffffff" />} buttonStyle={styles.acceptButton} title=" Yes." onPress={() => createCard(groupname)} />
      </Overlay>

      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View className="container" style={styles.information}>
          <View className="groups">
            <Text style={styles.title}>GROUPS</Text>
            <Button icon={<Icon name="check" type="evilicon" color="#ffffff" />} buttonStyle={styles.newGroupButton} title=" New Group" onPress={() => toggleOverlay()} />
            <Cards navigation={navigation} isGroup={isGroup} invalidate={invalidate} />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  gCard: {
    flex: 1,
    borderColor: "black",
    borderStyle: "solid",
  },
  ello: {
    backgroundColor: "#955f5f",
    borderWidth: 5,
    borderRadius: 15,
    marginBottom: 10,
    borderColor: "#ffffff",
  },
  newGroupButton: {
    backgroundColor: "#61955f",
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: 10,
  },
  acceptButton: {
    backgroundColor: "#61955f",
    marginTop: 10,
  },
  information: {
    backgroundColor: "#9FB3D1",
    height: height*3,
  },
  title: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  declineOverlay: {
    height: 200,
  },
});
