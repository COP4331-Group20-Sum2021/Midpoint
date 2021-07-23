import SideBar from "./sidebar"
import "../styles/groups.scss";
import Modal from './modal';
import React, { useState, useEffect } from 'react';

function Cards({ isGroup, dp, ep, kp, lp }) {
  let cards = isGroup && isGroup.map((group, i) => {
    var cid = "card" + i
    return (
      <div className="card" id={cid} key={i}>
      {group.groupname}<br />
      {group.participants.length} members<br />
        <button onClick={dp}>Delete</button>
        <button onClick={ep}>Edit</button>
        <button onClick={kp}>Kick</button>
        <button onClick={lp}>Leave</button>
      </div>
    )
  })

  if (cards === false) {
    return (
      <div>You currently have no groups. Please click "Create New" or visit the invitations page.</div>
    )
  }
  
  // console.log(cards)

  return (<div className="wrapper" id="wrapper">{cards}</div>)
}

export default function Groups() {
  // const [newGroupName, createNewGroupName] = useState()
  const [stale, setStale] = useState(false) // dont care about value, only care if this changed. This changing re renders the cards
  const [isGroup, setIsGroup] = useState()
  const [isOpen, setIsOpen] = useState(false)
  const [isCrud, setCrud] = useState(0)

  useEffect( () => {
    async function run() {
      const res = await fetch('https://group20-midpoint.herokuapp.com/api/listgroups', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId : "KeQFpHFYZnMdEsqf2PCq",
            userToken : "doesntmatteryet",
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
          userId : "KeQFpHFYZnMdEsqf2PCq",
          userToken : "doesntmatteryet",
          groupname : groupName,
        })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .then(() => setStale(!stale))
  }
  function deleteCard() {
    alert("Card has been deleted")
    var myobj = document.getElementById("card");
    myobj.remove();
  }
  function editCard() {
    alert("Card has been edited")
  }
  function kickCard() {
    alert("You have kicked from the group")
  }
  function leaveCard() {
    alert("You have left the group")
  }

  // Helper Functions
  function createPortal() {
    setIsOpen(true);
    setCrud(1);
  }
  function deletePortal() {
    setIsOpen(true);
    setCrud(2);
  }
  function editPortal() {
    setIsOpen(true);
    setCrud(3);
  }
  function kickPortal() {
    setIsOpen(true);
    setCrud(4);
  }
  function leavePortal() {
    setIsOpen(true);
    setCrud(5);
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
              create={createCard}
              del={deleteCard}
              edit={editCard}
              kick={kickCard}
              leave={leaveCard}
              onClose={() => {
                setIsOpen(false)
                // window.location.reload()
              }}>
            </Modal>
          </div>

          
          <Cards isGroup={isGroup} dp={deletePortal} ep={editPortal} kp={kickPortal} lp={leavePortal}/>
          

        </div>
      </div>
    </>
  )
}

  // function createDiv() {
  //   // Create text
  //   let div = document.createElement('div');
  //   div.innerText = document.getElementById('sample').innerText
  //   div.setAttribute("id", "card")

  //   // Create buttons
  //   let btnDelete = document.createElement('button');
  //   btnDelete.onclick = deletePortal;
  //   btnDelete.innerHTML = "Delete";
  //   btnDelete.setAttribute("id", "btnDelete");

  //   let btnEdit = document.createElement('button');
  //   btnEdit.onclick = editPortal;
  //   btnEdit.innerHTML = "Edit";
  //   btnEdit.setAttribute("id", "edit");

  //   let btnKick = document.createElement('button');
  //   btnKick.onclick = kickPortal;
  //   btnKick.innerHTML = "Kick";
  //   btnKick.setAttribute("id", "btnKick");


  //   let btnLeave = document.createElement('button');
  //   btnLeave.onclick = leavePortal;
  //   btnLeave.innerHTML = "Leave";
  //   btnLeave.setAttribute("id", "btnLeave");

    
  //   // Append fields to the card
  //   div.appendChild(btnDelete);
  //   div.appendChild(btnEdit);
  //   div.appendChild(btnKick);
  //   div.appendChild(btnLeave);
  //   document.getElementById("wrapper").appendChild(div);
  // }