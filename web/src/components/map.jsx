import SideBar from "./sidebar"
import "../styles/map.scss";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useAuth } from "../contexts/authContext";
import React, { useState, useEffect } from 'react';
import Modal from "./modal";

// Fix this height here
const mapContainerStyle = {
  height: "600px",
  width: "auto",
};

const options = {
  disableDefaultUI: true,
  //zoomControl: true,
};

function WholeMap({members, midpoint}){
  const [establishments, setEstablishments] = useState();

  useEffect( () => {
    fetch('https://group20-midpoint.herokuapp.com/api/getestablishments', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          latitude : midpoint.latitude,
          longitude : midpoint.longitude,
          filters : [],
        })
    })

    .then(response => response.json())

    .then(data => setEstablishments(data))

  },[])
  return(
    <>
      <GoogleMap 
        mapContainerStyle={mapContainerStyle} 
        center={midpoint}
        zoom={14} 
        options={options}
      >
      {members.map(member => {
        return (
          <Marker position={{lat: member.latitude, lng : member.longitude}}/>
        )
      })}
      {establishments && establishments.map(establishment => {
        return (
          <Marker position={{lat: establishment.latitude, lng : establishment.longitude}}/>
        )
      })}
      </GoogleMap>
    </>
  )
};

// function Markers({ isGroup, dp, ep, kp, lp }) {
//   let cards = isGroup && isGroup.map((group, i) => {
//     var cid = "card" + i
//     var groupInfo = {field1: "value"}

//     var delP = (e) => {
//       dp(group);
//     }
//     var editP = (e) => {
//       ep(group);
//     }
//     var kickP = (e) => {
//       kp(group);
//     }
//     var leaP = (e) => {
//       lp(group);
//     }

//     return (
//       <div className="card" id={cid} key={i}>
//         <div id="groupId">{group.groupId}</div>
//         <div id="groupName">{group.groupName}</div>
//         {group.groupname}<br />
//         {group.participants.length} members<br />
//         <button onClick={delP}>Delete</button>
//         <button onClick={editP}>Edit</button>
//         <button onClick={kickP}>Kick</button>
//         <button onClick={leaP}>Leave</button>
//       </div>
//     )
//   })

export default function Map({group}) {
    const googleAPIKey = process.env.REACT_APP_GOOGLE_API_KEY;
    const { user } = useAuth();
    const [libraries] = React.useState(["places"]);
    const [memberCoord, setMemberCoord] = useState(undefined)
    const [groupData, setGroupData] = useState(null)
    const [stale, setStale] = useState(false) // dont care about value, only care if this changed. This changing re renders the cards
    const [groupInfo, setGroupInfo] = useState(undefined)
    const [isGroup, setIsGroup] = useState()
    const [isOpen, setIsOpen] = useState(false)
    const [isCrud, setCrud] = useState(0)

    const { isLoaded, loadError } = useLoadScript({
      id: 'google-map-script',
      googleMapsApiKey: googleAPIKey,
      libraries,
    });

    useEffect( () => {
      fetch('https://group20-midpoint.herokuapp.com/api/retrievegroupdata', {
        method: "POST",
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
      .then(response => response.json())

      .then(data => {console.log(data); setGroupData(data); console.log(data)})

    },[])


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

  function addMember(group, newEmail) {
    fetch('https://group20-midpoint.herokuapp.com/api/inviteparticipant', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          userId : user.uid,
          userToken : user.Aa,
          email : newEmail,
          groupId: group.groupid,
        })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    }

    // const currentPosition = {
    //   lat: 20.20,
    //   lng: 20.20
    // }
  
    // const currentPosition2 = {
    //   lat: 21.20,
    //   lng: 21.20
    // }
  
    // const currentPosition3 = {
    //   lat: 19.20,
    //   lng: 19.20
    // }

    function kickMember(memberid) {
      fetch('https://group20-midpoint.herokuapp.com/api/kickfromgroup', {
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ownerId : user.uid,
            userToken : user.Aa,
            userId : memberid,
            groupId : group.groupid,
          })
      })
      .then(response => response.json())
      .then(data => console.log(data))
    }

    function leaveCard() {
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
    }
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

    function addPortal(group) {
      setIsOpen(true);
      setCrud(6);
      setGroupInfo(group);
    }
  
    return (
      <>
        <div className="container">
          <SideBar />
          <Modal
              open={isOpen}
              crud={isCrud}
              info={groupInfo}
              create={createCard}
              del={deleteCard}
              edit={editCard}
              kick={kickCard}
              leave={leaveCard}
              add={addPortal}
              onClose={() => {
                setIsOpen(false)
              }}>
            </Modal>

            <div className="map-content">

              <div className="group-name">
                {group.groupname}
              </div>

              <div className="buttons">
                <button>Leave Group</button>
                <button>Delete Group</button>
              </div>

              <div className="map-frame">
                {groupData && <WholeMap members={groupData.grouplocations} midpoint={{lat : groupData.midpoint.latitude, lng : groupData.midpoint.longitude}}/>}
                {/* <GoogleMap 
                  mapContainerStyle={mapContainerStyle} 
                  center={currentPosition}
                  zoom={14} 
                  options={options}
                >
                <Marker position={currentPosition}/>
                <Marker position={currentPosition2}/>
                <Marker position={currentPosition3}/>

                </GoogleMap> */}
                
              </div>
            
              <div className="point-list">
                MIDPOINT FOUND 3 LOCATIONS:
                <table className="location-table">

                <tr>
                  <td>Kyle</td>
                  <td>Olson</td>
                  <td>kolson@ucf.edu</td>
                </tr>
                <tr>
                  <td>Kyle</td>
                  <td>Olson</td>
                  <td>kolson@ucf.edu</td>
                </tr>
                <tr>
                  <td>Kyle</td>
                  <td>Olson</td>
                  <td>kolson@ucf.edu</td>
                </tr>
              </table>
              </div>



              <div className="member-container">
                <h3>Member List:</h3>
                <button onClick={addPortal}>ADD MEMBER</button>

              <table className="member-list">
                {groupData && groupData.grouplocations.map(member => {
                  return (
                    <tr key={member.email}>
                      <td>{member.firstname}</td>
                      <td>{member.lastname}</td>
                      <td>{member.email}</td>
                      {user.uid == member.userId 
                      ? <td><button onClick={() => leaveCard()}>LEAVE</button></td>
                      : <td><button onClick={() => kickMember(member.userId)}>KICK</button></td>

                    }

                    </tr>
                  )
                })}
              </table>
              </div>



            </div>
        </div>
      </>
    )
}