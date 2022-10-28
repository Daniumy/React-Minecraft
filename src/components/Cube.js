import { useBox } from "@react-three/cannon"
import {useStore} from "../hooks/useStore"
import * as textures from "../images/textures"
import { useState } from "react"
import { Vector3 } from "three";

export const Cube = ({ position, texture }) => {
     const [isHovered, setIsHovered] = useState(false);

     const [ref] = useBox(() => ({
          type: "Static",
          position
     }))

     const [addCube, removeCube] = useStore((state) => [state.addCube, state.removeCube])
     const playerPosition = useStore((state) => state.position)

     const activeTexture = textures[texture+"Texture"];

     function distanceLowerThanFive() {
          const vectorPosicion = new Vector3(playerPosition[0], playerPosition[1], playerPosition[2]);
          const { x, y, z } = ref.current.position;
          const vectorBloque = new Vector3(x, y, z);
          const distancia = vectorPosicion.distanceTo(vectorBloque);
                         
          return (distancia < 5);
     }

     return (
          <mesh ref={ref}
               onPointerMove={(e) => {
                    e.stopPropagation();
                    if (distanceLowerThanFive()) setIsHovered(true);
               }}
               onPointerOut={(e) => {
                    e.stopPropagation();
                    setIsHovered(false);
               }}
               onClick={(e) => {
                    e.stopPropagation();
                    
                    if (distanceLowerThanFive()) {
                         const { x, y, z } = ref.current.position;
                         const clickedFace = Math.floor(e.faceIndex / 2);
                         if (e.button === 0) {
                              removeCube(x, y, z);
                              return;
                         }
                         else if (e.button === 2)
                              switch (clickedFace) {
                                   case 0:
                                        addCube(x + 1, y, z);
                                        break;
                                   case 1:
                                        addCube(x - 1, y, z);
                                        break;
                                   case 2:
                                        addCube(x, y+1, z);
                                        break;
                                   case 3:
                                        addCube(x, y-1, z);
                                        break;
                                   case 4:
                                        addCube(x , y, z +1);
                                        break;
                                   case 5:
                                        addCube(x, y, z - 1);
                                        break;
                              
                                   default:
                                        break;
                              }
                    }
                    
               
          }}>
               <boxBufferGeometry attach="geometry" />
               <meshStandardMaterial map={activeTexture} attach="material" color={isHovered ? "grey" : "white"} transparent={true} opacity={texture === "glass" ? 0.6 : 1} />
          </mesh>
     )
}