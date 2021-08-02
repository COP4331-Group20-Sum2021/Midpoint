import React, { useState, useEffect } from "react";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import { Text, View, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";

import { createStackNavigator } from "@react-navigation/stack";
function Cards({ isGroup, setPage, invalidate, navigation }) {
  console.log(isGroup);
  let cards =
    isGroup &&
    isGroup.map((group, i) => {
      var cid = "card" + i;
      var groupInfo = { field1: "value" };

      console.log(isGroup[i]);
      console.log(setPage);
      return (
        <Card id={cid} key={i}>
          <Card.Title>{group.groupname}</Card.Title>
          <Card.Divider />
          <Text>{group.participants.length === 1 ? <Text>{group.participants.length} Member</Text> : <Text>{group.participants.length} Members</Text>}</Text>
          <Button buttonStyle={styles.acceptButton} onPress={() => navigation.push("Map", { group: group, testing: "gang" })} title="Generate Midpoint" />
        </Card>
      );
    });

  if (cards === false) {
    return <Text>You currently have no groups. Please click "Create New" or visit the invitations page.</Text>;
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
// export default function GroupRender() {
//   const [page, setPage] = useState();
//   useEffect(() => {
//     setPage(<Groups setPage={setPage} />);
//   }, []);

//   return <>{page}</>;
// }

export default function Groups({ navigation }) {
  const [newGroupName, createNewGroupName] = useState();
  const [stale, setStale] = useState(false); // dont care about value, only care if this changed. This changing re renders the cards
  const [groupInfo, setGroupInfo] = useState(undefined);
  const [isGroup, setIsGroup] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isCrud, setCrud] = useState(0);
  const { user, location } = useAuth();
  const invalidate = () => {
    setTimeout(() => {
      setStale(!stale);
    }, 250);
  };

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
  console.log(navigation);
  return (
    <View className="container">
      <View className="groups">
        <Text>GROUPS</Text>
        <Cards navigation={navigation} isGroup={isGroup} invalidate={invalidate} />
      </View>
    </View>
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
  acceptButton: {
    backgroundColor: "#61955f",
    borderWidth: 5,
    borderRadius: 15,
    marginBottom: 10,
    borderColor: "#ffffff",
  },
});

// useEffect(() => {
//   async function run() {
//     const res = await fetch("https://group20-midpoint.herokuapp.com/api/listgroups", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         userId: user.uid,
//         userToken: user.Aa,
//       }),
//     });
//     const j = await res.json();

//     if (res.ok) {
//       console.log(j);
//       setIsGroup(j.groupdata);
//     }
//   }
//   run();
// }, [stale]);

// // CRUD Functionality
// function createCard(groupName) {
//   fetch("https://group20-midpoint.herokuapp.com/api/creategroup", {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       userId: user.uid,
//       userToken: user.Aa,
//       groupname: groupName,
//     }),
//   })
//     .then((response) => response.json())
//     .then((data) => console.log(data))
//     .then(() => setStale(!stale));
// }
// function deleteCard(group) {
//   fetch("https://group20-midpoint.herokuapp.com/api/deletegroup", {
//     method: "DELETE",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       userId: user.uid,
//       userToken: user.Aa,
//       groupId: group.groupid,
//     }),
//   })
//     .then(console.log(group))
//     .then((response) => response.json())
//     .then((data) => console.log(data))
//     .then(() => setStale(!stale));
// }
// function editCard(group, newName) {
//   fetch("https://group20-midpoint.herokuapp.com/api/editgroup", {
//     method: "PUT",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       userId: user.uid,
//       userToken: user.Aa,
//       groupId: group.groupid,
//       groupname: newName,
//     }),
//   })
//     .then(console.log(group))
//     .then(console.log(newName))
//     .then((response) => response.json())
//     .then((data) => console.log(data))
//     .then(() => setStale(!stale));
// }
// function kickCard(group) {
//   fetch("https://group20-midpoint.herokuapp.com/api/kickfromgroup", {
//     method: "DELETE",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       userId: user.uid,
//       userToken: user.Aa,
//       groupId: group.groupid,
//       groupname: group.groupname,
//     }),
//   })
//     .then((response) => response.json())
//     .then((data) => console.log(data))
//     .then(() => setStale(!stale));
// }

// function leaveCard(group) {
//   fetch("https://group20-midpoint.herokuapp.com/api/removemyself", {
//     method: "DELETE",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       userId: user.uid,
//       userToken: user.Aa,
//       groupId: group.groupid,
//     }),
//   })
//     .then((response) => response.json())
//     .then((data) => console.log(data))
//     .then(() => setStale(!stale));
// }

// // Helper Functions
// function createPortal() {
//   setIsOpen(true);
//   setCrud(1);
// }
// function deletePortal(group) {
//   setIsOpen(true);
//   setCrud(2);
//   setGroupInfo(group);
// }
// function editPortal(group) {
//   setIsOpen(true);
//   setCrud(3);
//   setGroupInfo(group);
// }
// function kickPortal(group) {
//   setIsOpen(true);
//   setCrud(4);
//   setGroupInfo(group);
// }
// function leavePortal(group) {
//   setIsOpen(true);
//   setCrud(5);
//   setGroupInfo(group);
// }

// return (
//   <>
//     <div className="container">
//       <SideBar />
//       <div className="groups-content">
//         <div className="groups">
//           <div className="groups-title">
//             <h1>MY GROUPS</h1>
//             <button id="create-new-button" onClick={createPortal}><AddIcon id="add-icon"/>Create New</button>
//             <Modal
//               open={isOpen}
//               crud={isCrud}
//               info={groupInfo}
//               create={createCard}
//               del={deleteCard}
//               edit={editCard}
//               kick={kickCard}
//               leave={leaveCard}
//               onClose={() => {
//                 setIsOpen(false);
//               }}
//             ></Modal>
//           </div>

//           <Cards isGroup={isGroup} setPage={setPage} invalidate={invalidate} />
//         </div>

//       </div>
//     </div>
//   </>
// );
// }
