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
    <CanvasContainer className="earth">
      <Canvas>
        <Suspense fallback={null}>
            <Earth/>
        </Suspense>
      </Canvas>
    </CanvasContainer>
  );
}
