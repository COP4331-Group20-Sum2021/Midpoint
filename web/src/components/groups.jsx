import SideBar from "./sidebar"
import "../styles/groups.scss";
import Modal from './modal';
import React, { useState, useEffect } from 'react';

import { useAuth } from "../contexts/authContext";
function Cards({ isGroup, dp, ep, kp, lp }) {
  let cards = isGroup && isGroup.map((group, i) => {
    var cid = "card" + i
    var groupInfo = {field1: "value"}

    var delP = (e) => {
      dp(group);
    }
    var editP = (e) => {
      ep(group);
    }
    var kickP = (e) => {
      kp(group);
    }
    var leaP = (e) => {
      lp(group);
    }

    return (
      <div className="card" id={cid} key={i}>
        <div id="groupId">{group.groupId}</div>
        <div id="groupName">{group.groupName}</div>
        {group.groupname}<br />
        {group.participants.length} members<br />
        <button onClick={delP}>Delete</button>
        <button onClick={editP}>Edit</button>
        <button onClick={kickP}>Kick</button>
        <button onClick={leaP}>Leave</button>
      </div>
    )
  })

  if (cards === false) {
    return (
      <div>You currently have no groups. Please click "Create New" or visit the invitations page.</div>
    )
  }

  return (<div className="wrapper" id="wrapper">{cards}</div>)
}

export default function Groups() {
  // const [newGroupName, createNewGroupName] = useState()
  const [stale, setStale] = useState(false) // dont care about value, only care if this changed. This changing re renders the cards
  const [groupInfo, setGroupInfo] = useState(undefined)
  const [isGroup, setIsGroup] = useState()
  const [isOpen, setIsOpen] = useState(false)
  const [isCrud, setCrud] = useState(0)
  const { user } = useAuth()



  useEffect( () => {
    async function run() {
      const res = await fetch('https://group20-midpoint.herokuapp.com/api/listgroups', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId : user.uid,
            userToken : user.Aa,
          })
      })
      const j = await res.json()
    
      if (res.ok) {
        console.log(j)
        setIsGroup(j.groupdata)
      }
    }
    run()
  }, [stale])


  // CRUD Functionality
  function createCard(groupName) {
    fetch('https://group20-midpoint.herokuapp.com/api/creategroup', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          userId : user.uid,
          userToken : user.Aa,
          groupname : groupName,
        })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .then(() => setStale(!stale))
  }
  function deleteCard(group) {
    fetch('https://group20-midpoint.herokuapp.com/api/deletegroup', {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          userId : user.uid,
          userToken : user.Aa,
          groupId : group.groupid,
        })
    })
    .then(console.log(group))
    .then(response => response.json())
    .then(data => console.log(data))
    .then(() => setStale(!stale))
  }
  function editCard(group, newName) {
    fetch('https://group20-midpoint.herokuapp.com/api/editgroup', {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          userId : user.uid,
          userToken : user.Aa,
          groupId: group.groupid,
          groupname : newName,
        })
    })
    .then(console.log(group))
    .then(console.log(newName))
    .then(response => response.json())
    .then(data => console.log(data))
    .then(() => setStale(!stale))
  }
  function kickCard(group) {
    fetch('https://group20-midpoint.herokuapp.com/api/kickfromgroup', {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          userId : user.uid,
          userToken : user.Aa,
          groupId: group.groupid,
          groupname : group.groupname,
        })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .then(() => setStale(!stale))
  }

  function leaveCard(group) {
    fetch('https://group20-midpoint.herokuapp.com/api/removemyself', {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          userId : user.uid,
          userToken : user.Aa,
          groupId: group.groupid,
        })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .then(() => setStale(!stale))
  }

  // Helper Functions
  function createPortal() {
    setIsOpen(true);
    setCrud(1);
  }
  function deletePortal(group) {
    setIsOpen(true);
    setCrud(2);
    setGroupInfo(group)
  }
  function editPortal(group) {
    setIsOpen(true);
    setCrud(3);
    setGroupInfo(group)

  }
  function kickPortal(group) {
    setIsOpen(true);
    setCrud(4);
    setGroupInfo(group)

  }
  function leavePortal(group) {
    setIsOpen(true);
    setCrud(5);
    setGroupInfo(group)
  }

  return (
    <>
      <div className="container">

        <SideBar />

        <div className="groups-content">

          <div className="groups"><h1>GROUPS</h1></div>

          <div className="icons">
            <button onClick={createPortal}  >
              Create New
            </button>
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
                setIsOpen(false)
              }}>
            </Modal>
          </div>

          
          <Cards isGroup={isGroup} dp={deletePortal} ep={editPortal} kp={kickPortal} lp={leavePortal}/>
          

        </div>
      </div>
    </>
  )
}