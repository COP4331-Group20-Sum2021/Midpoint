import "../styles/Home.scss"
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import styled from "styled-components";
import { Earth } from "./earth/earth";

const CanvasContainer = styled.div`
  width: 100%;
  height: 600px;
  `;

export default function Home() {
  return (
    <div className="content">

      <CanvasContainer className="earth">
        <Canvas>
          <Suspense fallback={null}>
              <Earth/>
          </Suspense>
        </Canvas>
      </CanvasContainer>

      <div className="container">

        <div className="information">

          <div></div>
          <div>
            <h1>CREATE GROUPS</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ir
              ure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excep
              teur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          
          <div>
            <h1>FIND MIDPOINTS</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ir
              ure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excep
              teur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div></div>
          <div></div>
          <div>
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
