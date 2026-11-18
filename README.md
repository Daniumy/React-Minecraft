# React Minecraft

> **Pre-AI experiment (2022).** A weekend toy: a Minecraft-style voxel sandbox in
> the browser, built to learn 3D on the web. Archived, not maintained, not a
> game. Kept public because it is a nice snapshot of learning by breaking things.

Walk around a 100×100 ground, look with the mouse, and place or remove blocks
with five textures. The world can be saved in `localStorage`.

**Live demo:** <https://minecraftjs.netlify.app/> — still answering at the time of
archiving, but it can disappear at any moment.

## Why this repo exists

I built this in October 2022, after finishing my degree project, with one goal:
understand how 3D works in the browser without learning raw WebGL or Three.js
first. `react-three-fiber` was the excuse — it turns 3D objects into React
components, which meant I could reuse what I already knew.

It was never meant to be a real game. It is the answer to a very specific
question: *"can I make blocks feel like Minecraft?"* — pointer lock, a physics
body for the player, textures on cubes, and clicking a face to place the next
block next to it.

Today an AI assistant would generate most of this in an afternoon. In 2022 the
interesting part was figuring out **why** the camera, the physics body and the
clicked face have to agree with each other, and that is what I actually kept.

## Controls

| Input | Action |
| --- | --- |
| `W` `A` `S` `D` | Move |
| `Space` | Jump |
| Mouse | Look around (click the canvas first to lock the pointer) |
| Left click | Remove the block under the crosshair |
| Right click | Add a block on the face you are pointing at |
| `1`–`5` | Pick texture: dirt, grass, glass, wood, log |
| `Esc` | Show/hide the menu |
| Save / Reset | Persist the world in `localStorage` / clear it |

You can only build within ~5 units of the player, so the crosshair is not a
long-range construction tool.

## What it taught me

- **The R3F scene graph**: `<Canvas>`, meshes, `useFrame`, and how React state
  and the render loop coexist.
- **Physics**: `@react-three/cannon` with static boxes for blocks and a dynamic
  sphere for the player, plus the jump only firing when vertical velocity is near
  zero.
- **Raycasting details**: using `faceIndex` to know which face of a cube was
  clicked and spawning the new block on that side instead of inside the old one.
- **Pointer lock** for a first-person camera, and why the camera has to copy the
  physics body position every frame.
- **Global state** with `zustand`, including a tiny persistence layer for the
  world.
- **Performance intuition**: reusing textures and geometries instead of creating
  them per block.

## Tech (brief)

- **React 18** + **Create React App**
- **Three.js 0.145** through **@react-three/fiber 8**
- **@react-three/drei** — `Sky`, `PointerLockControls`
- **@react-three/cannon 6** — physics
- **zustand 4** for the world state, **nanoid** for block keys
- Textures are small `.jpg`/`.png` files imported as modules

## Running it locally

```bash
npm install
npm start
```

Opens at [http://localhost:3000](http://localhost:3000). It is desktop-only by
design: mouse and keyboard, no touch controls and no mobile layout. Expect 2022
dependency rot if you try to install it today.

## Status

- **Archived.** No maintenance, no dependency updates.
- **A toy, not a game.** No world generation, no multiplayer, no mobs, no
  survival mechanics, no backend. That was the scope on purpose.
- **Frozen in 2022.** The code is exactly what came out of that weekend.

---

# React Minecraft (Español)

> **Experimento pre-IA (2022).** Un juguete de fin de semana: un sandbox de
> vóxeles estilo Minecraft en el navegador, hecho para aprender 3D en la web.
> Archivado, sin mantenimiento y no es un juego. Se mantiene público porque es
> una buena foto de aprender rompiendo cosas.

Anda por un suelo de 100×100, mira con el ratón y coloca o quita bloques con
cinco texturas. El mundo se puede guardar en `localStorage`.

**Demo en vivo:** <https://minecraftjs.netlify.app/> — seguía respondiendo al
archivar este repo, pero puede desaparecer en cualquier momento.

## Por qué existe este repo

Lo hice en octubre de 2022, después de terminar el TFG, con un objetivo:
entender cómo funciona el 3D en el navegador sin aprender antes WebGL o Three.js
en crudo. `react-three-fiber` fue la excusa — convierte objetos 3D en componentes
de React, así que podía reutilizar lo que ya sabía.

Nunca pretendió ser un juego de verdad. Es la respuesta a una pregunta muy
concreta: *"¿puedo hacer que unos bloques se sientan como Minecraft?"* — pointer
lock, un cuerpo físico para el jugador, texturas en los cubos y clicar una cara
para colocar el siguiente bloque al lado.

Hoy un asistente de IA generaría casi todo esto en una tarde. En 2022 lo
interesante era entender **por qué** la cámara, el cuerpo físico y la cara
clicada tienen que cuadrar entre sí, y eso es lo que realmente me llevé.

## Controles

| Entrada | Acción |
| --- | --- |
| `W` `A` `S` `D` | Moverse |
| `Espacio` | Saltar |
| Ratón | Mirar (clic en el canvas para bloquear el puntero) |
| Clic izquierdo | Quitar el bloque bajo la mira |
| Clic derecho | Añadir un bloque en la cara a la que apuntas |
| `1`–`5` | Elegir textura: tierra, hierba, cristal, madera, tronco |
| `Esc` | Mostrar/ocultar el menú |
| Save / Reset | Guardar el mundo en `localStorage` / borrarlo |

Solo se puede construir a unos 5 unidades del jugador, así que la mira no es una
herramienta de construcción a distancia.

## Qué me sirvió

- **El grafo de escena de R3F**: `<Canvas>`, mallas, `useFrame` y cómo conviven
  el estado de React y el bucle de render.
- **Física**: `@react-three/cannon` con cajas estáticas para los bloques y una
  esfera dinámica para el jugador, además de un salto que solo se dispara cuando
  la velocidad vertical está cerca de cero.
- **Detalles de raycasting**: usar `faceIndex` para saber qué cara del cubo se
  clicó y crear el bloque nuevo en ese lado, no dentro del anterior.
- **Pointer lock** para una cámara en primera persona, y por qué la cámara tiene
  que copiar cada frame la posición del cuerpo físico.
- **Estado global** con `zustand`, incluida una capa mínima de persistencia para
  el mundo.
- **Intuición de rendimiento**: reutilizar texturas y geometrías en vez de
  crearlas por bloque.

## Tecnologías (breve)

- **React 18** + **Create React App**
- **Three.js 0.145** a través de **@react-three/fiber 8**
- **@react-three/drei** — `Sky`, `PointerLockControls`
- **@react-three/cannon 6** — física
- **zustand 4** para el estado del mundo, **nanoid** para las claves de bloque
- Las texturas son `.jpg`/`.png` pequeños importados como módulos

## Ejecutarlo en local

```bash
npm install
npm start
```

Abre en [http://localhost:3000](http://localhost:3000). Es solo para escritorio a
propósito: ratón y teclado, sin controles táctiles ni diseño móvil. Cuenta con la
podredumbre de dependencias de 2022 si intentas instalarlo hoy.

## Estado

- **Archivado.** Sin mantenimiento ni actualizaciones de dependencias.
- **Un juguete, no un juego.** Sin generación de mundo, sin multijugador, sin
  mobs, sin supervivencia y sin backend. El alcance era ese a propósito.
- **Congelado en 2022.** El código es exactamente lo que salió de ese fin de
  semana.
