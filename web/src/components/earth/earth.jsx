import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber"
import { TextureLoader } from "three";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import EarthDayMap from "../../assets/textures/8k_earth_daymap.jpg";
import EarthNormalMap from "../../assets/textures/8k_earth_normal_map.jpg";
import EarthSpecularMap from "../../assets/textures/8k_earth_specular_map.jpg";
import EarthCloudsMap from "../../assets/textures/8k_earth_clouds.jpg";

export function Earth(props) {

    const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
        TextureLoader, 
        [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
    );
    
    const earthRef = useRef();
    const cloudsRef = useRef();

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
        earthRef.current.rotation.y = elapsedTime / 6;
        cloudsRef.current.rotation.y = elapsedTime / 6;
    });

    return (
        <>
            <ambientLight intensity={.8} />
            <pointLight color="#f6f3ea" position={[50, 0, 50]} intensity={1.2} />
            <mesh ref={cloudsRef} position={[0, 0, 0]}>
                <sphereGeometry args={[2.605, 50, 50]} />
                <meshPhongMaterial 
                    map={cloudsMap} 
                    opacity={0.4} 
                    depthWrite={true} 
                    transparent={true} 
                    side={THREE.DoubleSide}
                />
            </mesh>
            <mesh ref={earthRef} position={[0, 0, 0]}>
                <sphereGeometry args={[2.6, 50, 50]} />
                <meshPhongMaterial specularMap={specularMap}/>
                <meshStandardMaterial map={colorMap} normalMap={normalMap} metalness={0.4} roughness={0.7}/>
                <OrbitControls 
                    enableZoom={false} 
                    enablePan={false} 
                    enableRotate={true}
                    zoomSpeed={0.6}
                    rotateSpeed={0.4}
                />
            </mesh>
        </>
    );
}
