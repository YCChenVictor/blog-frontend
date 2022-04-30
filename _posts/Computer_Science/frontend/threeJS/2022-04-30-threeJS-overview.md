---
layout: post
title: (threeJS) overview
description: ''
date: '2022-04-30'
categories: threeJS
note: tailwind 要怎麼自動調整 width according to browser 要想辦法
mathjax:
mermaid:
p5:
threeJS: false
---

## Introduction

1. camera, lighting, geometry
2. it's not for modeling sophistic model

## Why?

I want to make my own fantasy.

## How?

### installation

Follow the instruction in [Installation](https://threejs.org/docs/#manual/en/introduction/Installation)

I use the CDN method in github pages and remember to find the version you want in [three.js](https://www.npmjs.com/package/three)

```
<script type="module">
  import * as THREE from 'three';
  const scene = new THREE.Scene();
</script>
```

### basic script

To start threeJS, we always need scene, camera, render.

#### scene

Scene is container

```
const scene = new THREE.Scene();
```

#### camera

Camera defines the way to capture the scene. The basic script to define camera:

```
const fieldOfView = 75
const aspectRatio = window.innerWidth / window.innerHeight
const nearestDistance = 0.1
const farthestDistance = 1000
const moveOnZaxis = 30
const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearestDistance, farthestDistance)
camera.position.setZ(moveOnZaxis);
```

#### renderer

Just the way to render the everything in the canvas

```
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector(#threeExample),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, camera)
```

## What?

<div id='' class='h-screen justify-center items-center'>
  <canvas id='threeExample' class='object-scale-down'>
    Hello World
  </canvas>
</div>

<script type="importmap">
  {
    "imports": {
      "three": "https://unpkg.com/three@0.140.0/build/three.module.js"
    }
  }
</script>

<script type="module">
  import * as THREE from 'three';
  const scene = new THREE.Scene();

  const fieldOfView = 75
  const aspectRatio = window.innerWidth / window.innerHeight
  const nearestDistance = 0.1
  const farthestDistance = 1000
  const moveOnZaxis = 30
  const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearestDistance, farthestDistance)

  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#threeExample'),
  })

  camera.position.setZ(moveOnZaxis);

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.render(scene, camera)
  console.log(window.devicePixelRatio)
</script>

## Reference

[Installation](https://threejs.org/docs/#manual/en/introduction/Installation)

[Build a Mindblowing 3D Portfolio Website // Three.js Beginner’s Tutorial](https://www.youtube.com/watch?v=Q7AOvWpIVHU&t=198s)
