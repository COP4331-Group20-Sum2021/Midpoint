import { Card, ListItem, Button, Icon, Overlay } from "react-native-elements";
import { Text, View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { useAuth } from "../context/AuthContext";
import React, { useEffect, useState } from "react";

//import SideBar from "./sidebar"
//import "../styles/invitations.scss";
//import CheckIcon from '@material-ui/icons/Check';
//import CloseIcon from '@material-ui/icons/Close';

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

// MODAL STUFF => (Only works for mobile)

const OverlayExample = () => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <Button title="Open Overlay" onPress={toggleOverlay} />

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text>Hello from Overlay!</Text>
      </Overlay>
    </View>
  );
};

export default function Invitations() {
  const { user } = useAuth();
  const [invitations, setInvitations] = useState([]);

  useEffect(() => {
    // const intervalId = setInterval(() => {
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
      .then((data) => {
        setInvitations(data.invitedata);
      });
  }, []);

  // Uncomment for functionality
  function acceptInvitation(index, id, gid) {
    console.log(index, id, gid);
    // fetch("https://group20-midpoint.herokuapp.com/api/acceptinvitation", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     inviteId: id,
    //     userId: user.uid,
    //     userToken: user.Aa,
    //     email: user.email,
    //     groupId: gid,
    //   }),
    // }).then((response) => {
    //   if (response.ok) {
    //     setInvitations(invitations.filter((invitation, i) => i !== index));
    //   }
    // });
  }

  // Uncomment for functionality
  function declineInvitation(index, id) {
    console.log(index, id);
    // fetch("https://group20-midpoint.herokuapp.com/api/declineinvitation", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     userId: user.uid,
    //     userToken: user.Aa,
    //     email: user.email,
    //     inviteId: id,
    //   }),
    // }).then((response) => {
    //   if (response.ok) {
    //     setInvitations(invitations.filter((invitation, i) => i !== index));
    //   }
    // });
  }

  console.log("Invitations: " + invitations);
  console.log(invitations);
  return (
    <>
      <ScrollView>
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
              <OverlayExample />
              {invitations &&
                invitations.map((invitation, i) => {
                  return (
                    <>
                      {/* List Invites View */}

                      <Card>
                        <Card.Title>Group Invitation</Card.Title>
                        <Card.Divider />
                        <Text style={{ marginBottom: 10 }}>From : {invitation.from}</Text>
                        <Text style={{ marginBottom: 10 }}>Group : {invitation.groupname}</Text>
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
                          onPress={() => declineInvitation(i, invitation.inviteId)}
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
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 10,
    borderColor: "#ffffff",
  },
  acceptButton: {
    backgroundColor: "#61955f",
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 10,
    borderColor: "#ffffff",
  },
  information: {
    backgroundColor: "#9FB3D1",
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
});
