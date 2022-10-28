import { usePlane } from "@react-three/cannon";
import { groundTexture } from "../images/textures";
import { useStore } from "../hooks/useStore";
import { Vector3 } from "three";

export const Ground = () => {
     const [ref] = usePlane(() => ({
          rotation: [-Math.PI/2,0,0], position: [0,-0.5,0]
     }))

     const [addCube] = useStore((state) => [state.addCube])
     const position = useStore((state) => state.position)
     
     groundTexture.repeat.set(100, 100)
     
     return (
          <mesh
               onClick={(e) => {
                    e.stopPropagation()
                    if (e.button === 2) {
                         const vectorPosicion = new Vector3(position[0], position[1], position[2]);
                         const [x, y, z] = Object.values(e.point).map(val => Math.ceil(val));
                         const vectorBloque = new Vector3(x, y, z);
                         const distancia = vectorPosicion.distanceTo(vectorBloque);
                         
                         if (distancia < 5) {
                              addCube(x, y, z);
                         }
                    } 
                  
                    
               }}
               ref={ref}
          >
               <planeBufferGeometry attach="geometry" args={[100, 100]} />
               <meshStandardMaterial attach="material" map={groundTexture} />
          </mesh>
     )
}