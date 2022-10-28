import { useThree, useFrame } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { Vector3 } from "three";
import { useEffect, useRef } from "react";
import { useKeyboard } from "../hooks/useKeyboard";
import { useStore } from "../hooks/useStore";

const JUMP_FORCE = 4;
const SPEED_FORCE = 4;

export const Player = () => {
     const {moveBackward, moveForward, moveLeft, moveRight, jump} = useKeyboard();

     const [setPlayerPosition] = useStore((state) => [state.setPlayerPosition])

     const { camera } = useThree();
     const [ref, api] = useSphere(() => ({
          mass: 1,
          type: "Dynamic",
          position: [0,1,0]
     }))

     const vel = useRef([0, 0, 0])
     
     //it will re-run everytime the api velocity changes
     useEffect(() => {
          api.velocity.subscribe((v) => { vel.current = v })
     }, [api.velocity])

     const pos = useRef([0, 0, 0])
     
     //it will re-run everytime the api position changes
     useEffect(() => {
          api.position.subscribe((p) => { pos.current = p })
     }, [api.position])

     useEffect(() => {
          setPlayerPosition(pos.current);
     }, [pos.current])

     useFrame(() => {
          camera.position.copy(new Vector3(pos.current[0], pos.current[1], pos.current[2]))
          
          const direction = new Vector3();

          const frontVector = new Vector3(0,0,(moveBackward ? 1 : 0) - (moveForward ? 1 : 0));

          const sideVector = new Vector3((moveLeft ? 1 : 0) - (moveRight ? 1 : 0),0,0);

          direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED_FORCE).applyEuler(camera.rotation);

          api.velocity.set(direction.x, vel.current[1] ,direction.z )

          if (jump && Math.abs(vel.current[1]) < 0.05) {
               api.velocity.set(vel.current[0], JUMP_FORCE, vel.current[2]);
          }
     })

     return (
          <mesh ref={ref}></mesh>
     )
}