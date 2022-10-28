import { useEffect } from "react";
import { useStore } from "../hooks/useStore";
import { useKeyboard } from "../hooks/useKeyboard";
import {dirtImg, grassImg, glassImg, logImg, woodImg} from "../images/images"
import "../App.css";

const images = {
     dirt: dirtImg,
     grass: grassImg,
     glass: glassImg,
     wood: woodImg,
     log: logImg,
}

export const TextureSelector = () => {
     const [activeTexture, setTexture] = useStore((state) => [state.texture, state.setTexture])
     const {dirt,grass,glass,wood,log} = useKeyboard();

     useEffect(() => {
          const textures = {
			dirt,
			grass,
			glass,
			wood,
			log
		}
          const pressedTexture = Object.entries(textures).find(([k,v]) => v)
          if (pressedTexture) {
               setTexture(pressedTexture[0]);
          }
     }, [setTexture, dirt, grass, glass, wood, log])
     
     // useEffect(() => {
     //      const visibilityTimeout = setTimeout(() => {
     //           setVisible(false);
     //      }, 2000);
     //      setVisible(true);
     //      return () => {
     //           clearTimeout(visibilityTimeout);
     //      }
     // }, [activeTexture])

     return (<div className="absolute centered-bottom texture-selector">
          {Object.entries(images).map(([k, src]) => {
               return <img key={k} src={src} className={`${k === activeTexture ? "active" : ""}`} alt={k} />
          })}
     </div>)
}