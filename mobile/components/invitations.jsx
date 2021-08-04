import { Card, ListItem, Button, Icon, Overlay } from "react-native-elements";
import { Text, View, StyleSheet, ScrollView, Dimensions, RefreshControl } from "react-native";
import { useAuth } from "../context/AuthContext";
import React, { useEffect, useState } from "react";

//import SideBar from "./sidebar"
//import "../styles/invitations.scss";
//import CheckIcon from '@material-ui/icons/Check';
//import CloseIcon from '@material-ui/icons/Close';

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

// MODAL STUFF => (Only works for mobile)


export default function Invitations() {
  const { user } = useAuth();
  const [invitations, setInvitations] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [visible, setVisible] = useState(false);
  const [inviteData, setInviteData] = useState(undefined);


  // Make Modal visible or invisible
  const toggleOverlay = (index, id) => {
    console.log("Toggle ooga booga ",index,id);
    setInviteData({index:index, id:id});
    setVisible(!visible);
  };

  function populateInvites() {
    fetch("https://group20-midpoint.herokuapp.com/api/listinvites", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.uid,
        userToken: user.Aa,
        email: user.email,
      }),
    })
      .then((response) => response.json())
      .then((data) => setInvitations(data.invitedata));
  }

  // Uncomment for functionality
  function acceptInvitation(index, id, gid) {
    //toggleOverlay();
    console.log(index, id, gid);
    fetch("https://group20-midpoint.herokuapp.com/api/acceptinvitation", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inviteId: id,
        userId: user.uid,
        userToken: user.Aa,
        email: user.email,
        groupId: gid,
      }),
    }).then((response) => {
      if (response.ok) {
        setInvitations(invitations.filter((invitation, i) => i !== index));
      }
    });
  }

  // Uncomment for functionality
  function declineInvitation(index, id) {
    //toggleOverlay(index, id);
    console.log(index, id);
    setVisible(!visible);
    fetch("https://group20-midpoint.herokuapp.com/api/declineinvitation", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.uid,
        userToken: user.Aa,
        email: user.email,
        inviteId: id,
      }),
    }).then((response) => {
      if (response.ok) {
        setInvitations(invitations.filter((invitation, i) => i !== index));
      }
    });
  }

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = React.useCallback(() => {
    populateInvites()
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={styles.content}>
          <View style={styles.container}>
            {/* Entire Page View */}
            <View style={styles.information}>
              {/* {user ? <DrawerItem label="Logout" onPress={logout} /> : <></>} */}

              {invitations.length === 0 ? (
                <View>
                  <Text style={styles.title}>No Invitations</Text>
                </View>
              ) : (
                <Text style={styles.title}> Open Invitations: </Text>
              )}

              <View>
                {/* <Button title="Open Overlay" onPress={toggleOverlay} /> */}

                <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={styles.declineOverlay}>
                  <Text style={styles.overlayTitle}>Are you sure you want to decline the invite?</Text>
                  <Button
                          icon={<Icon name="check" type="evilicon" color="#ffffff" />}
                          buttonStyle={styles.declineButton}
                          title=" Yes."
                          onPress={() => declineInvitation(inviteData.index, inviteData.id)}
                        />
                </Overlay>
              </View>

              {invitations &&
                invitations.map((invitation, i) => {
                  return (
                    <>
                      {/* List Invites View */}

                      <Card containerStyle={{backgroundColor: '#364761', borderWidth: 0}}>
                        <Card.Title style={{ fontSize: 25, color:'white' }}>Group Invitation</Card.Title>
                        <Card.Divider color='white' />
                        <Text style={{ marginBottom: 10, fontSize: 20, color:'white' }}>From: {invitation.from}</Text>
                        <Text style={{ marginBottom: 10, fontSize: 15, color:'white' }}>Group: {invitation.groupname}</Text>
                        <Button
                          icon={<Icon name="check" color="#ffffff" />}
                          buttonStyle={styles.acceptButton}
                          title=" Accept Invite"
                          onPress={() => acceptInvitation(i, invitation.inviteId, invitation.groupId)}
                        />
                        <Button
                          icon={<Icon name="close" type="evilicon" color="#ffffff" />}
                          buttonStyle={styles.declineButton}
                          title=" Decline Invite"
                          onPress={() => toggleOverlay(i, invitation.inviteId)}
                        />
                      </Card>

                      {/* List Invites View */}
                    </>
                  );
                })}
            </View>
            {/* Entire Page View */}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  declineButton: {
    backgroundColor: "#955f5f",
    marginBottom: 10,
    borderColor: "#ffffff",
  },
  acceptButton: {
    backgroundColor: "#438C63",
    marginBottom: 10,
    borderColor: "#ffffff",
  },
  information: {
    backgroundColor: "#212C3D",
    height: height,
  },
  separator: {
    borderBottomColor: "white",
    borderBottomWidth: 2,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 50,
    marginTop: 50,
  },
  title: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  declineOverlay : {
    height: 180,
  },
  overlayTitle : {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
    marginBottom : 40,
  }
});
