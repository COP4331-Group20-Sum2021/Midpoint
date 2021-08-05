import SideBar from "./sidebar";
import "../styles/groups.scss";
import Modal from "./modal";
import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import Map from "./map";
import AddIcon from '@material-ui/icons/Add';

export default function GroupRender() {
  const [page, setPage] = useState();
  useEffect(() => {
    setPage(<Groups setPage={setPage} />);
  }, []);

  return <>{page}</>;
}

function Cards({ isGroup, setPage, invalidate }) {
  let cards =
    isGroup &&
    isGroup.map((group, i) => {
      var cid = "card" + i;
      var groupInfo = { field1: "value" };

      console.log(isGroup[i]);
      console.log(setPage);
      return (
        <div className="card" onClick={() => setPage(<Map group={isGroup[i]} setPage={setPage} invalidate={invalidate} />)} id={cid} key={i}>
          <h2>{group.groupname}</h2>
          {group.participants.length === 1 ? <h3>{group.participants.length} Member</h3> : <h3>{group.participants.length} Members</h3>}
        </div>
      );
    });

  if (cards === false) {
    return <div>You currently have no groups. Please click "Create New" or visit the invitations page.</div>;
  }

  return (
    <div className="wrapper" id="wrapper">
      {cards}
    </div>
  );
}

function Groups({ setPage }) {
  // const [newGroupName, createNewGroupName] = useState()
  const [stale, setStale] = useState(false); // dont care about value, only care if this changed. This changing re renders the cards
  const [groupInfo, setGroupInfo] = useState(undefined);
  const [isGroup, setIsGroup] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isCrud, setCrud] = useState(0);
  const { user } = useAuth();
  const invalidate = () => {
    setTimeout(() => {
      setStale(!stale);
    }, 250);
  };

  useEffect(() => {
    async function run() {
      const res = await fetch("https://group20-midpoint-stg.herokuapp.com/api/listgroups", {
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

  // CRUD Functionality
  function createCard(groupName) {
    fetch("https://group20-midpoint-stg.herokuapp.com/api/creategroup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.uid,
        userToken: user.Aa,
        groupname: groupName,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(() => setStale(!stale));
  }
  function deleteCard(group) {
    fetch("https://group20-midpoint-stg.herokuapp.com/api/deletegroup", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.uid,
        userToken: user.Aa,
        groupId: group.groupid,
      }),
    })
      .then(console.log(group))
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(() => setStale(!stale));
  }
  function editCard(group, newName) {
    fetch("https://group20-midpoint-stg.herokuapp.com/api/editgroup", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.uid,
        userToken: user.Aa,
        groupId: group.groupid,
        groupname: newName,
      }),
    })
      .then(console.log(group))
      .then(console.log(newName))
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(() => setStale(!stale));
  }
  function kickCard(group) {
    fetch("https://group20-midpoint-stg.herokuapp.com/api/kickfromgroup", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.uid,
        userToken: user.Aa,
        groupId: group.groupid,
        groupname: group.groupname,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(() => setStale(!stale));
  }

  function leaveCard(group) {
    fetch("https://group20-midpoint-stg.herokuapp.com/api/removemyself", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.uid,
        userToken: user.Aa,
        groupId: group.groupid,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(() => setStale(!stale));
  }

  // Helper Functions
  function createPortal() {
    setIsOpen(true);
    setCrud(1);
  }
  function deletePortal(group) {
    setIsOpen(true);
    setCrud(2);
    setGroupInfo(group);
  }
  function editPortal(group) {
    setIsOpen(true);
    setCrud(3);
    setGroupInfo(group);
  }
  function kickPortal(group) {
    setIsOpen(true);
    setCrud(4);
    setGroupInfo(group);
  }
  function leavePortal(group) {
    setIsOpen(true);
    setCrud(5);
    setGroupInfo(group);
  }

  return (
    <>
      <div className="container">
        <SideBar />
        <div className="groups-content">
          <div className="groups">
            <div className="groups-title">
              <h1>MY GROUPS</h1>
              <button id="create-new-button" onClick={createPortal}><AddIcon id="add-icon"/>Create New</button>
              <Modal
                open={isOpen}
                crud={isCrud}
                info={groupInfo}
                create={createCard}
                del={deleteCard}
                edit={editCard}
                kick={kickCard}
                leave={leaveCard}
                onClose={() => {
                  setIsOpen(false);
                }}
              ></Modal>
            </div>

            <Cards isGroup={isGroup} setPage={setPage} invalidate={invalidate} />
          </div>

          
        </div>
      </div>
    </>
  );
}
