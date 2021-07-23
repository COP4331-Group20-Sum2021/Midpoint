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
  const googleAPIKey = process.env.NODE_ENV === "production" ? process.env.GOOGLE_API_KEY : process.env.REACT_APP_GOOGLE_API_KEY;

  const [libraries] = React.useState(["places"]);

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
                        <label htmlFor="fname">FIRST NAME</label>
                        <h2 style={{margin: 0}}>Firstname</h2>
                      </div>
                      <div>
                        <label htmlFor="lname">LAST NAME</label>
                        <h2 style={{margin: 0}}>Lastname</h2>
                      </div>
                    </div>

                    <div>
                        <label htmlFor="email">EMAIL</label>
                        <h2 style={{margin: 0}}>Email@email.com</h2>
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

