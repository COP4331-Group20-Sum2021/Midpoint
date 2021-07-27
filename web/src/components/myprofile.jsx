import React from "react";
import SideBar from "./sidebar"
import "../styles/myprofile.scss";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useAuth } from "../contexts/authContext";
import Avatar from 'avatar-initials';

const mapContainerStyle = {
  height: "500px",
  width: "auto"
};

const options = {
  disableDefaultUI: true,
  //zoomControl: true,
};

export default function MyProfile() {
  const googleAPIKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const { user } = useAuth()
  
  const [libraries] = React.useState(["places"]);
  const [profile, setProfile] = React.useState()

  const { isLoaded, loadError } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: googleAPIKey,
    libraries,
  });

  const [ currentPosition, setCurrentPosition ] = React.useState({lat: 0, lng: 0});

  const success = position => {
    const currPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
    setCurrentPosition(currPosition);
  };

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, null, { enableHighAccuracy: true });
    fetch('https://group20-midpoint.herokuapp.com/api/getuserdata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: user.uid })
    })
      .then(res => res.json())
      .then(j => setProfile(j))
      .then(console.log(user))
  }, []);

  React.useEffect(() => {
    if (profile) {
      Avatar.from(document.getElementById('profile-picture'), {
        'useGravatar': false,
        'initials': profile.firstname.charAt(0) + profile.lastname.charAt(0),
        'size': 500,
        'initial_font_family': "Poppins",
        'initial_weight': 500,
        'initial_size': 0,
        'initial_fg': 'white',
        'initial_bg': '#5F7595',
      })
      console.log(user)
    }
  }, [profile]);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <>
      <div className="container">
        <SideBar />
        <div className="profile-content">
          <div className="profile">

              <div className="top-section">
                <div className="title">
                  <h1>MY PROFILE</h1>
                </div>
                
                <div className="profile-information">
                  <img id="profile-picture" alt="Profile"></img>
                  {/* <img src={ProfilePicture} id="profile-picture" alt="Profile"></img> */}
                  
                  <form className="form-rows">
                    <div className="fl-form">
                      <div>
                        <label htmlFor="fname">FIRST NAME</label>
                        <h2 style={{margin: 0}}>{profile && profile.firstname}</h2>
                      </div>
                      <div>
                        <label htmlFor="lname">LAST NAME</label>
                        <h2 style={{margin: 0}}>{profile && profile.lastname}</h2>
                      </div>
                    </div>

                    <div>
                        <label htmlFor="email">EMAIL</label>
                        <h2 style={{margin: 0}}>{profile && profile.email}</h2>
                    </div> 
                    
                  </form>
                </div>
              </div>  

            <div className="bottom-section">
              <div className="title">
                <h2>Your Location:</h2>
              </div>
              <GoogleMap 
                mapContainerStyle={mapContainerStyle} 
                center={currentPosition}
                zoom={14} 
                options={options}
              >
              { currentPosition.lat ? <Marker position={currentPosition} /> : null }
              </GoogleMap>
            </div>

          </div>
          
          
        </div>
      </div>
    </>
  )
}

