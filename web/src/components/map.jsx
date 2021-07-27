import SideBar from "./sidebar"
import "../styles/map.scss";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useAuth } from "../contexts/authContext";
import React, { useState, useEffect } from 'react';


// Fix this height here
const mapContainerStyle = {
  height: "600px",
  width: "auto",
};

const options = {
  disableDefaultUI: true,
  //zoomControl: true,
};

function WholeMap(){
  
  const currentPosition = {
    lat: 20.20,
    lng: 20.20
  }

  const currentPosition2 = {
    lat: 21.20,
    lng: 21.20
  }

  const currentPosition3 = {
    lat: 19.20,
    lng: 19.20
  }

  return(
    <>
      <GoogleMap 
        mapContainerStyle={mapContainerStyle} 
        center={currentPosition}
        zoom={14} 
        options={options}
      >
      <Marker position={currentPosition}/>
      <Marker position={currentPosition2}/>
      <Marker position={currentPosition3}/>

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

export default function Map() {
    const googleAPIKey = process.env.REACT_APP_GOOGLE_API_KEY;
    const { user } = useAuth();
    const [libraries] = React.useState(["places"]);
    const [memberCoord, setMemberCoord] = useState(undefined)

    const { isLoaded, loadError } = useLoadScript({
      id: 'google-map-script',
      googleMapsApiKey: googleAPIKey,
      libraries,
    });

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

    return (
      <>
        <div className="container">
          <SideBar />

            <div className="map-content">

              <div className="group-name">
                Insert Generic Group Name
              </div>

              <div className="buttons">
                <button>Leave Group</button>
                <button>Delete Group</button>
              </div>

              <div className="map-frame">
                <WholeMap />
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



              
              <table className="member-list">
                <tr>
                  <th>MEMBER LIST:</th>
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
                <tr>
                  <td>Kyle</td>
                  <td>Olson</td>
                  <td>kolson@ucf.edu</td>
                </tr>
              </table>




            </div>
        </div>
      </>
    )
}