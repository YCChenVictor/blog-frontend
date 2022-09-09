---
layout: post
title:
description: ''
date: '2022-09-04'
categories:
note:
mathjax:
mermaid:
p5:
threeJS:
anchor:
publish:
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

### import 3D model

```javascript
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function Scene() {
  const gltf = useLoader(GLTFLoader, '/Poimandres.gltf')
  return (
    <Suspense fallback={null}>
      <primitive object={gltf.scene} />
    </Suspense>
  )
}
```

### animate

## What?

give an example

## Reference

[react-three-fiber](https://github.com/pmndrs/react-three-fiber)

[Loading Models](https://docs.pmnd.rs/react-three-fiber/tutorials/loading-models)

[Working with GLB models in React.js: Import 3d Text from Vectary using React-three-fiber](https://www.youtube.com/watch?v=8UB78yGtEJA)

https://github.com/pmndrs/gltfjsx
