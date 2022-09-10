---
layout: post
title:
description: ''
date: '2022-09-04'
categories: threeJS
note:
mathjax:
mermaid:
p5:
threeJS:
anchor:
publish: true
---

## Introduction

Given we have basic concepts of react, threeJS and 3D model, we can start to build a 3D frontend.

## Why?

focus on why we need it

## How?

### create a react app

Refer to react/2021-06-13-overview

### install

Refer to [react-three-fiber](https://github.com/pmndrs/react-three-fiber)

### first threejs component

```javascript
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += 0.01))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default Box;
```

* `useFrame`: it will execute codes on every rerendered frame
* size: TBC

### background

```jsx
const Background = props => {

  const {gl} = useThree();

  const texture = useTexture('/autoshop.jpg')
  const formatted = new THREE.WebGLCubeRenderTarget(texture.image.height).fromEquirectangularTexture(gl, texture)
  return(
    <primitive attach="background" object={formatted.texture} />
  )
}

<Suspense fallback={null}>
  <Background />
</Suspense>
```

### import 3D model

turn gltf into jsx component

```bash
npx gltfjsx xxx.glb
```

it will produce something as follow:

```javascript
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/cat.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Cube.geometry} material={materials.Material} />
      <mesh geometry={nodes['12221_Cat_v1_l3'].geometry} material={materials.Cat} />
    </group>
  )
}

useGLTF.preload('/cat.glb')
```

### perspective

Add an orbit_control listening to the mouse of the domElement and modify the camera according to the mouse movement

```jsx
const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(
    () => {
      const controls = new OrbitControls(camera, gl.domElement);

      controls.minDistance = 3;
      controls.maxDistance = 20;
      return () => {
        controls.dispose();
      };
    },
    [camera, gl]
  );
  return null;
};
```

and put it in `<Canvas>`

### animate

### interaction



### routes

Before we dive in, please see concept of routes in react in react/2021-06-13-overview

```jsx
function App() {
  <div>
    <Canvas>
      <Router>
        <Routes>
          <Route path="/" element={<Box position={[-1.2, 0, 0]} />} />
        </Routes>
      </Router>
    </Canvas>
  </div>
}

export default App
```

and import it

```jsx
<Router>
  <App />
</Router>
```

## What?

Ok, I am trying to create a world based on 2022-08-13-best-system.

## Reference

[react-three-fiber](https://github.com/pmndrs/react-three-fiber)

[Loading Models](https://docs.pmnd.rs/react-three-fiber/tutorials/loading-models)

[Working with GLB models in React.js: Import 3d Text from Vectary using React-three-fiber](https://www.youtube.com/watch?v=8UB78yGtEJA)

https://github.com/pmndrs/gltfjsx
