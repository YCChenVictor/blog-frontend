---
layout: post
title:
description: ''
date: '2022-05-01'
categories: threeJS
note:
mathjax:
mermaid:
p5:
threeJS: true
publish: true
---

## Introduction

This article describes how to create a character in ThreeJS with steps:

* create character in blender
* import it into threeJS
* define movement states

## Why?

TBC

## How?

### create character in blender

I just use some free 3D model because I have no idea on building own characters. Remember to export it as glTF.

### import it into threeJS

Please refer to 2022-04-30-threeJS-overview.md for basic concepts. TBC

## What?

<div id='' class='h-screen justify-center items-center'>
  <canvas id='threeExample' class='object-scale-down'>
  </canvas>
</div>

<script type="module">
  import * as THREE from 'three';
  import {OrbitControls} from 'orbit_controls';

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

  ////////////////////////////////////

  const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
  const material = new THREE.MeshStandardMaterial({color: 0xFF6347})
  const torus = new THREE.Mesh(geometry, material);
  scene.add(torus)

  ////////////////////////////////////

  const pointLight = new THREE.PointLight(0xffffff)
  pointLight.position.set(5, 5, 5)

  const ambientLight = new THREE.AmbientLight(0xffffff)
  scene.add(pointLight, ambientLight)

  /////////////////////////////////////

  const lightHelper = new THREE.PointLightHelper(pointLight)
  scene.add(lightHelper)

  const gridHelper = new THREE.GridHelper(200, 50)
  scene.add(gridHelper)

  /////////////////////////////////////

  const controls = new OrbitControls(camera, renderer.domElement);

  /////////////////////////////////////

  const backgroundImagePath = "{{site.baseurl}}/assets/img/space.jpeg"
  const spaceTexture = new THREE.TextureLoader().load(backgroundImagePath);
  scene.background = spaceTexture;

  const moonTexture = new THREE.TextureLoader().load('{{site.baseurl}}/assets/img/moon_texture.jpeg');
  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
      map: moonTexture,
    })
  );
  scene.add(moon)

  /////////////////////////////////////

  function animate() {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    controls.update();

    renderer.render(scene, camera);
  }
  
  animate()
</script>

## Reference

[mixamo](https://www.mixamo.com/#/)

[Import FREE Rigged and Animated Characters into Blender with the Adobe Mixamo Add-On](https://www.youtube.com/watch?v=yDc-E-o_I-c)

[Character creation in ThreeJS](https://blog.farazshaikh.com/stories/character-creation-in-three-js/)

[Wolf Rigged And Game Ready](https://free3d.com/3d-model/wolf-rigged-and-game-ready-42808.html)

[Loading 3D models](https://threejs.org/docs/#manual/en/introduction/Loading-3D-models)
