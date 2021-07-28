import React, { useState, useEffect } from 'react';
import { useAuth } from "../contexts/authContext";
import { GoogleMap, Marker, useLoadScript, Circle } from "@react-google-maps/api";
import SideBar from "./sidebar"
import "../styles/map.scss";
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

function WholeMap({members, midpoint, setFoundMidpoints, filter}){
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
          filters : [filter],
        })
    })
    .then(response => response.json())
    .then(data => {setEstablishments(data); setFoundMidpoints(data)})
  }, [filter])

  return(
    <>
      <GoogleMap 
        mapContainerStyle={mapContainerStyle} 
        center={midpoint}
        zoom={13} 
        options={options}
      >
        {members.map(member => {
          console.log(member)
          return (
            <Marker
              position={{lat: member.latitude, lng : member.longitude}} 
              label={{
                title: `${member.firstname} ${member.lastname}`,
                className: 'memberMarker'
              }}
              // icon={'https://cdn.imgbin.com/18/4/14/imgbin-computer-icons-person-man-09UWDtM0ZjT6usvVJbRDtYtaC.jpg'}
            />
          )
        })}
        {establishments && establishments.map(establishment => {
          return (
            <Marker position={{lat: establishment.latitude, lng : establishment.longitude}}/>
          )
        })}

        <Circle center={midpoint} radius={3000}
          options={{
            fillColor: '#C1DAFF',
            fillOpacity: .25,
            strokeOpacity: 1,
            strokeColor: '#7E94B4',
            strokeWeight: 1
          }}
        />
      </GoogleMap>
    </>
  )
};

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
  const [foundMidpoints, setFoundMidpoints] = useState()
  const [filter, setFiler] = useState()

  const { isLoaded, loadError } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: googleAPIKey,
    libraries,
  });

  function handleFilter(e)
  {
    e.preventDefault();
    setFiler(e.target.value)
  }

  ////////////////////////////////
  //        Populate Data       //
  ////////////////////////////////
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

  ////////////////////////////////
  //     CRUD Functionality     //
  ////////////////////////////////
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
    .then(console.log(group.groupid))
    .then(response => response.json())
    .then(data => console.log(data))
  }

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
  ////////////////////////////////
  //          Portals           //
  ////////////////////////////////
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
    console.log(group)
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
          add={addMember}
          onClose={() => {
            setIsOpen(false)
          }}>
        </Modal>

          <div className="map-content">

            {/* Group Name */}
            <div className="group-name">
              {group.groupname}
            </div>

            {/* Buttons */}
            <div className="buttons">
            <select name="cars" id="cars" onChange={handleFilter}>
              <option value="all">All</option>
              <option value="restaurants">Restaurants</option>
              <option value="entertainment">Entertainment</option>
              <option value="recreation">Recreation</option>
            </select>
              <button>Leave Group</button>
              <button>Delete Group</button>
            </div>

            {/* Map Frame */}
            <div className="map-frame">
              {groupData && <WholeMap
                members={groupData.grouplocations} 
                midpoint={{ lat : groupData.midpoint.latitude, lng : groupData.midpoint.longitude }}
                setFoundMidpoints={setFoundMidpoints}
                filter={filter}
              />}
            </div>
          
            {/* Midpoints */}
            <div className="point-list">
              MIDPOINT FOUND 3 LOCATIONS:
              <table className="location-table">
              {foundMidpoints && foundMidpoints.map(m => {
                return (
                  <tr key={m.name}>
                    <td>{m.name}</td>
                    <td>{m.address}</td>
                    <td>{m.rating}</td>
                    <td>{m.price}</td>
                  </tr>
                )
              })}
            </table>
            </div>


            {/* Member List */}
            <div className="member-container">
              <h3>Member List:</h3>
              <button onClick={() => addPortal(group)}>ADD MEMBER</button>

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