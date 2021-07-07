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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ir
              ure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excep
              teur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          
          <div className="information-text">
            <h1>FIND MIDPOINTS</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ir
              ure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excep
              teur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <div className="seperator"></div>

          <div className="information-images"><img src={findmidpointsPicture} alt="Create Groups"></img></div>

          <div className="information-images"><img src={meetupPicture} alt="Create Groups"></img></div>

          <div className="seperator"></div>

          <div className="information-text">
            <h1>MEET UP</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ir
              ure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excep
              teur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
