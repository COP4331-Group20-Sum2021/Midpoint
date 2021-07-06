import React from "react";
import { useLoader } from "@react-three/fiber"
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


    return (
        <>
            <ambientLight intensity={1} />
            <mesh >
                
                <sphereGeometry args={[2.605, 50, 50]} />
                <meshPhongMaterial 
                    map={cloudsMap} 
                    opacity={0.4} 
                    depthWrite={false} 
                    transparent={true} 
                    side={THREE.DoubleSide}
                />
            </mesh>
            <mesh>
                <sphereGeometry args={[2.6, 50, 50]} />
                <meshPhongMaterial specularMap={specularMap} />
                <meshStandardMaterial map={colorMap} normalMap={normalMap} />
                <OrbitControls 
                    enableZoom={false} 
                    enablePan={true} 
                    enableRotate={true}
                    zoomSpeed={0.6}
                    panSpeed={0.5}
                    rotateSpeed={0.4}
                    autoRotate={true}
                    autoRotateSpeed={0.2}
                />
            </mesh>
        </>
    );
}
