import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import { GoogleMap, Marker, useLoadScript, Circle, InfoWindow } from "@react-google-maps/api";
import SideBar from "./sidebar";
import "../styles/map.scss";
import Modal from "./modal";
import StarRateIcon from '@material-ui/icons/StarRate';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Loading from "./loading";

const colorMap = {
  restaurant: "red",
  amusement_park: "purple",
  aquarium: "purple",
  art_gallery: "purple",
  bakery: "red",
  bar: "red",
  beauty_salon: "orange",
  bicycle_store: "orange",
  book_store: "orange",
  bowling_alley: "purple",
  cafe: "red",
  campground: "green",
  car_dealer: "orange",
  car_rental: "orange",
  car_repair: "orange",
  car_wash: "orange",
  casino: "purple",
  clothing_store: "orange",
  convenience_store: "orange",
  department_store: "orange",
  electronics_store: "orange",
  florist: "orange",
  food: "red",
  furniture_store: "orange",
  gas_station: "orange",
  gym: "purple",
  hair_care: "orange",
  hardware_store: "orange",
  home_goods_store: "orange",
  jewelry_store: "orange",
  lodging: "purple",
  library: "purple",
  liquor_store: "orange",
  meal_delivery: "purple",
  meal_takeaway: "purple",
  movie_theater: "purple",
  museum: "purple",
  night_club: "purple",
  park: "green",
  pet_store: "purple",
  restaurant: "red",
  school: "yellow",
  shoe_store: "purple",
  shopping_mall: "orange",
  spa: "purple",
  stadium: "purple",
  store: "orange",
  supermarket: "orange",
  tourist_attraction: "purple",
  zoo: "purple",
  recreation: "green",
};

// Fix this height here
const mapContainerStyle = {
  height: "600px",
  width: "auto",
};

const options = {
  disableDefaultUI: true,
  //zoomControl: true,
};

function WholeMap({ members, midpoint, setFoundMidpoints, filter, clickEstablishment, setClickEstablishment }) {
  const [establishments, setEstablishments] = useState();
  const [loading, setLoading] = useState(true);
  const [clickMember, setClickMember] = useState(false)

  // UNCOMMENT THIS TO SHOW ENDPOINT ON MAP
  useEffect(() => {
    setLoading(true)
    fetch("https://group20-midpoint.herokuapp.com/api/getestablishments", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        latitude: midpoint.lat,
        longitude: midpoint.lng,
        filters: filter,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setEstablishments(data);
        setFoundMidpoints(data);
        setLoading(false)
      });
  }, [filter]);

  return (
    <>
      {loading && <Loading />}
      {!loading &&
        <GoogleMap id="whole-map" mapContainerStyle={mapContainerStyle} center={midpoint} zoom={12} options={options}>
          {members.map((member, i) => {
            return (
              <Marker
                position={{ lat: member.latitude, lng: member.longitude }}
                icon={`http://maps.google.com/mapfiles/ms/icons/blue-dot.png`}
                onClick={() => setClickMember(i)}
              >
              {clickMember === i &&
                <InfoWindow
                  position={{ lat: member.latitude, lng: member.longitude }}
                  onCloseClick={() => setClickMember(false)}
                >
                  <div className='infoBox'>
                    <p>{member.firstname} {member.lastname}</p>
                  </div>
                </InfoWindow>
              }
              </Marker>
            );
          })}
          {establishments &&
            establishments.establishments.map((establishment, i) => {
              if (colorMap[establishment.type]) {
                // With color
                return (
                  <Marker
                    key={i}
                    position={{
                      lat: establishment.latitude,
                      lng: establishment.longitude,
                    }}
                    icon={`http://maps.google.com/mapfiles/ms/icons/${colorMap[establishment.type]}-dot.png`}
                    onClick={() => setClickEstablishment(i)}
                  >
                    {clickEstablishment === i &&
                      <InfoWindow
                        position={{ lat: establishment.latitude, lng: establishment.longitude }}
                        onCloseClick={() => setClickEstablishment(false)}
                      >
                        <div className='infoBox'>
                          <p>{establishment.name}</p>
                          <p>{establishment.address}</p>
                          <p><StarRateIcon/> {establishment.rating}</p>
                        </div>
                      </InfoWindow>
                    }
                  </Marker>
                );
              } else {
                // Black
                return (
                  <Marker
                    key={i}
                    position={{
                      lat: establishment.latitude,
                      lng: establishment.longitude,
                    }}
                    icon={`http://maps.google.com/mapfiles/ms/icons/yellow-dot.png`}
                    onClick={() => setClickEstablishment(i)}
                  >
                    {clickEstablishment === i &&
                      <InfoWindow
                        position={{ lat: establishment.latitude, lng: establishment.longitude }}
                        onCloseClick={() => setClickEstablishment(false)}
                      >
                        <div className='infoBox'>
                          <p>{establishment.name}</p>
                          <p>{establishment.address}</p>
                          <p><StarRateIcon/> {establishment.rating}</p>
                        </div>
                      </InfoWindow>
                    }
                  </Marker>
                );
              }
            })}

          <Circle
            center={midpoint}
            radius={3000}
            options={{
              fillColor: "#C1DAFF",
              fillOpacity: 0.25,
              strokeOpacity: 1,
              strokeColor: "#7E94B4",
              strokeWeight: 1,
            }}
          />
        </GoogleMap>
      }
    </>
  );
}

export default function Map({ group, setPage, invalidate }) {
  const googleAPIKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const { user } = useAuth();

  const [libraries] = React.useState(["places"]);
  const [memberCoord, setMemberCoord] = useState(undefined);
  const [groupData, setGroupData] = useState(null);
  const [stale, setStale] = useState(false); // dont care about value, only care if this changed. This changing re renders the cards
  const [groupInfo, setGroupInfo] = useState(undefined);
  const [isGroup, setIsGroup] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isCrud, setCrud] = useState(0);
  const [foundMidpoints, setFoundMidpoints] = useState();
  const [filter, setFilter] = useState();
  const [establishments, setEstablishments] = useState();
  const [clickEstablishment, setClickEstablishment] = useState(false)


  // this loads the stuff ish with google maps
  const { isLoaded, loadError } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: googleAPIKey,
    libraries,
  });

  function handleFilter(e) {
    e.preventDefault();
    setFilter(e.target.value);
  }

  ////////////////////////////////
  //        Populate Data       //
  ////////////////////////////////
  useEffect(() => {
    fetch("https://group20-midpoint.herokuapp.com/api/retrievegroupdata", {
      method: "POST",
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
      .then((data) => {
        console.log(data);
        setGroupData(data);
      });
    // GroupData -> {error: ... , grouplocations:}
  }, []);

  ////////////////////////////////
  //     CRUD Functionality     //
  ////////////////////////////////
  function createCard(groupName) {
    fetch("https://group20-midpoint.herokuapp.com/api/creategroup", {
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
    fetch("https://group20-midpoint.herokuapp.com/api/deletegroup", {
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

  function editCard(group, newName) {
    fetch("https://group20-midpoint.herokuapp.com/api/editgroup", {
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
    fetch("https://group20-midpoint.herokuapp.com/api/kickfromgroup", {
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
    fetch("https://group20-midpoint.herokuapp.com/api/removemyself", {
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

  function addMember(group, newEmail) {
    fetch("https://group20-midpoint.herokuapp.com/api/inviteparticipant", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.uid,
        userToken: user.Aa,
        email: newEmail,
        groupId: group.groupid,
      }),
    })
      .then(console.log(group.groupid))
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  function kickMember(memberid) {
    fetch("https://group20-midpoint.herokuapp.com/api/kickfromgroup", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ownerId: user.uid,
        userToken: user.Aa,
        userId: memberid,
        groupId: group.groupid,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  function leaveCard() {
    fetch("https://group20-midpoint.herokuapp.com/api/removemyself", {
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
      .then((data) => console.log(data));
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
    console.log("THIS IS GROUPS DATA");
    console.log(group);
    console.log(group.groupid);
    setIsOpen(true);
    setCrud(5);
    console.log(group);
    setGroupInfo(group);
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
          setPage={setPage}
          invalidate={invalidate}
          create={createCard}
          del={deleteCard}
          edit={editCard}
          kick={kickCard}
          leave={leaveCard}
          add={addMember}
          onClose={() => {
            setIsOpen(false);
          }}
        ></Modal>

        <div className="map-content">
          <div className="maps">
            <div className="maps-title">
              {/* Group Name */}
              <h1>{group.groupname}</h1>
              {/* Buttons */}
              <div className="buttons">
                
                <button onClick={() => leavePortal(group)}>Leave Group</button>
                <button onClick={() => deletePortal(group)}>Delete Group</button>
              </div>
            </div>

            <div className="map-and-locations">
              {/* Map Frame */}
              {/* <div className="map-frame"> */}
              {groupData && (
                <WholeMap
                  members={groupData.grouplocations}
                  midpoint={{
                    lat: groupData.midpoint.latitude,
                    lng: groupData.midpoint.longitude,
                  }}
                  setFoundMidpoints={setFoundMidpoints}
                  filter={filter}
                  clickEstablishment={clickEstablishment}
                  setClickEstablishment={setClickEstablishment}
                />
              )}
              {/* </div> */}

              {/* Establishments */}
              <div className="point-list">
                <div className="point-list-title">
                
                {foundMidpoints ? 
                  <div className="found-midpoints">
                    <h3>MIDPOINT FOUND {foundMidpoints.establishments.length} LOCATIONS</h3> 
                    <select name="cars" id="cars" onChange={handleFilter}>
                      <option value="">All</option>
                      <option value="restaurants">Restaurants</option>
                      <option value="entertainment">Entertainment</option>
                      <option value="recreation">Recreation</option>
                      <option value="shopping">Shopping</option>
                    </select>
                  </div> : 
                  <div className="found-midpoints"><h3>Calculating Midpoints...</h3></div>
                }
                </div>

                <div className="scroll">
                  <table className="location-table">
                  {foundMidpoints && (
                    <>
                        {foundMidpoints.establishments.map((m) => {
                          // console.log(foundMidpoints)
                          return (
                            <tr key={m.name}>
                              <td>{m.name}</td>
                              <td>{m.address}</td>
                              <td><div className="ratings"><StarRateIcon/>{m.rating}</div></td>
                              {/* <td>{m.price}</td> */}
                            </tr>
                          );
                        })}
                    </>
                  )}
                </table>
              </div>
              </div>
            </div>

            {/* Member List */}
            <div className="member-container">
              <div className="member-title">
                <h3>Member List</h3>
                <button id="add-member-button" onClick={() => addPortal(group)}>
                  ADD MEMBER
                </button>
              </div>

              <table className="member-list">
                {groupData &&
                  groupData.grouplocations.map((member) => {
                    return (
                      <tr key={member.email}>
                        <td>{member.firstname} {member.lastname}</td>
                        <td>{member.email}</td>
                        {user.uid === member.userId ? (
                          <td id="member-list-buttons">
                            <button onClick={() => leaveCard()}>LEAVE</button>
                          </td>
                        ) : (
                          <td id="member-list-buttons">
                            <button onClick={() => kickMember(member.userId)}>KICK</button>
                          </td>
                        )}
                      </tr>
                    );
                  })}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
