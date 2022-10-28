import { useEffect, useState } from "react";
import { useStore } from "../hooks/useStore";
import { useKeyboard } from "../hooks/useKeyboard";

export const Menu = () => {
     const [saveWorld, resetWorld] = useStore((state) => [state.saveWorld, state.resetWorld]);
     const {escape} = useKeyboard();

     useEffect(() => {
          if (escape === true) {
               setIsActive(!isActive);
          }
     }, [escape])
     
     const [isActive, setIsActive] = useState(false);

     return (
          <div className="menu absolute">
               <button className={isActive ? "button active" : "button"} onClick={() => saveWorld()}>Save</button>
               <button className={isActive ? "button active" : "button"} onClick={() => resetWorld()}>Reset</button>
          </div>
     )
}