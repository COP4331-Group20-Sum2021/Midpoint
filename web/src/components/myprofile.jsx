import React from "react";
import SideBar from "./sidebar"
import "../styles/myprofile.scss";
import ProfilePicture from "../assets/images/devinbesaw.jpg";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
  height: "500px",
  width: "auto"
};

const options = {
  disableDefaultUI: true,
  //zoomControl: true,
};

export default function MyProfile() {

  const [libraries] = React.useState(["places"]);

  const { isLoaded, loadError } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
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
    navigator.geolocation.getCurrentPosition(success);
  }, []);

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
                  <img src={ProfilePicture} id="profile-picture" alt="Profile"></img>
                  
                  <form className="form-rows">
                    <div className="fl-form">
                      <div>
                        <label for="fname">FIRST NAME</label>
                        <input type="text" id="fname" value="First Name"/>
                      </div>
                      <div>
                        <label for="lname">LAST NAME</label>
                        <input type="text" id="lname" value="Last Name"/>
                      </div>
                    </div>

                    <div>
                        <label for="email">EMAIL</label>
                        <input type="text" id="email" value="Email"/>
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

