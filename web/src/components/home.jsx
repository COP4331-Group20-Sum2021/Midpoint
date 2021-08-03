import "../styles/Home.scss"
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Earth } from "./earth/earth";
import creategroupsPicture from '../assets/images/create-groups.png';
import findmidpointsPicture from '../assets/images/find-midpoints.png';
import meetupPicture from '../assets/images/meet-up.png';

export default function Home() {
  return (
    <div className="content">

      <div className="earth">
        <Canvas>
          <Suspense fallback={null}>
              <Earth/>
          </Suspense>
        </Canvas>
      </div>

      <div className="container">

        <div className="information">

          <div className="information-images"><img src={creategroupsPicture}  alt="Create Groups"></img></div>

          <div className="seperator"></div>

          <div className="information-text">
            <h1>CREATE GROUPS</h1>
            <p>
            Planning a night out with friends but cant decide where to go? Want to get dinner with your significant other but neither of 
            you can decide which establishment is for you? Well Midpoint is the app for you! Midpoint is an application to make getting together with friends easier. 
            Sign up and create a group through our interface. From there, midpoint will get everyone's current locations, and it will give you a list of places in 
            the middle of all of you. 
            </p>
          </div>
          
          <div className="information-text">
            <h1>FIND MIDPOINTS</h1>
            <p>
              Midpoint will automatically create a circle in the center of a group to find establishments of equal distance from all members. Then, midpoint will grab all
              of those establishments in the circle and return a list of them to you with their name, address, and rating.
            </p>
          </div>

          <div className="seperator"></div>

          <div className="information-images"><img src={findmidpointsPicture} alt="Create Groups"></img></div>

          <div className="information-images"><img src={meetupPicture} alt="Create Groups"></img></div>

          <div className="seperator"></div>

          <div className="information-text">
            <h1>MEET UP</h1>
            <p>
              Midpoint will give you a list of various establishments to meet up at. Those establishments can be sorted by type to filter out places
              your group might not what to go to. Restaurants, entertainment, recreation, and shopping can all be filtered to find the perfect place for 
              your group to meet up. Additionally, ratings can be seen for each establishment to determine places not worth going to.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
