import SideBar from "./sidebar"
import "../styles/groups.scss";
import Modal from './modal';
import React, { useState, useEffect } from 'react';




export default function Groups() {
  // const [newGroupName, createNewGroupName] = useState()
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
    run();
  }, [])

  function CreateNewGroupName(groupName) {
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
  }







  // CRUD Functionality
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
              create={CreateNewGroupName}
              del={deleteCard}
              edit={editCard}
              kick={kickCard}
              leave={leaveCard}
              onClose={() => {
                setIsOpen(false)
                window.location.reload()
              }}>
            </Modal>
          </div>

          <div className="wrapper" id="wrapper">
          {isGroup && isGroup.map((group, i) => {
            return (
              <div id="card" key={i}>
              {group.groupname}<br />
              {group.participants.length} members<br />
                <button onClick={deletePortal}>Delete</button>
                <button onClick={editPortal}>Edit</button>
                <button onClick={kickPortal}>Kick</button>
                <button onClick={leavePortal}>Leave</button>
              </div>
            )
          })}
          </div>

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