import { Text, View, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";
import React, { useEffect, useState } from "react";

//import SideBar from "./sidebar"
//import "../styles/invitations.scss";
//import CheckIcon from '@material-ui/icons/Check';
//import CloseIcon from '@material-ui/icons/Close';

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

  function acceptInvitation(index, id, gid) {
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

  function declineInvitation(index, id) {
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

  console.log("Invitations: " + invitations);
  console.log(invitations);
  return (
    <>
      {/* Entire Page View */}
      <View>
        <Text h1> Show Open Invitations </Text>
        {/* {user ? <DrawerItem label="Logout" onPress={logout} /> : <></>} */}

        {invitations.length === 0 ? (
          <View>
            <Text>No Invitations</Text>
          </View>
        ) : (
          <View>
            <Text>Group Name</Text>
            <Text>From</Text>
          </View>
        )}

        {invitations &&
          invitations.map((invitation, i) => {
            return (
              <>
                {/* List Invites View */}
                <View>
                  <Text> Group: {invitation.groupname} </Text>
                  <Text> From: {invitation.from} </Text>
                </View>
                {/* List Invites View */}
              </>
            );
          })}
      </View>
      {/* Entire Page View */}
    </>
  );
}
