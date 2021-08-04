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
        <Card id={cid} key={i} containerStyle={{backgroundColor: '#4C5E79', borderWidth: 0}}>
          <Card.Title style={{color: 'white'}}>{group.groupname}</Card.Title>
          <Card.Divider />
          <Text style={{fontSize: 20, textAlign: 'center', color: 'white'}}>{group.participants.length === 1 ? <Text>{group.participants.length} Member</Text> : <Text>{group.participants.length} Members</Text>}</Text>
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
        <Text style={styles.overlayTitle}>Group Name</Text>
        <TextInput style={styles.input} placeholder="new group name" onChangeText={(text) => onChangeText(text)} />
        <Button icon={<Icon name="check" type="evilicon" color="#ffffff" />} buttonStyle={styles.acceptButton} title=" Yes." onPress={() => createCard(groupname)} />
      </Overlay>

      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={styles.information}>
          <View>
            <Text style={styles.title}>GROUPS</Text>
            <Button icon={<Icon name="plus" type="evilicon" color="#ffffff" />} buttonStyle={styles.newGroupButton} title=" New Group" onPress={() => toggleOverlay()} />
            <Cards navigation={navigation} isGroup={isGroup} invalidate={invalidate} />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  newGroupButton: {
    backgroundColor: "#438C63",
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: 10,
  },
  acceptButton: {
    backgroundColor: "#438C63",
    marginTop: 10,
  },
  information: {
    backgroundColor: "#212C3D",
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
    padding: 10,
    width: '100%'
  },
  declineOverlay: {
    width: '95%',
    paddingVertical: 20,
  },
  overlayTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 5,
  }
});
