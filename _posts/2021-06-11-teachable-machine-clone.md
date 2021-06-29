---
layout: post
title: (React) Clone Teachable Machine
description:
date: '2021-06-11'
categories: react
note: to be continued
---

## Introduction
This article serves as a note for cloning tensorflow open source project, [teachable machine](https://teachablemachine.withgoogle.com/).

## Why
I just want to learn tensorflow and this project seems can practice both image and audio recognization.

## How
### Frontend
* [**parcel**](https://parceljs.org/getting_started.html) to create a project and add [**.gitignore**](https://github.com/parcel-bundler/examples/blob/master/.gitignore)
* [**bootstrap**](https://getbootstrap.com/docs/5.0/getting-started/parcel/) for style
* [**posthtml**](https://v2.parceljs.org/languages/html/) for partial render; however, in the partial render part, I need to refresh or restart the website several times and the CSS seems to be unstable, and I think this is a good chance to practice SPA and save more calculation power for tensorflow, so I turned to reactJS.

After deleting all files
* [**react**](https://reactjs.org/docs/create-a-new-react-app.html) for SPA.
* [**tailwind**](https://tailwindcss.com/docs/guides/create-react-app) for inline code styling.

The file structure would be as follow:
然後這邊要一一解釋一下每個 directory 是在幹嘛

These files are we going to build. The basic concept in to decompose the website into lots of small components, making them as reusable as possible.

### image project
The first project in this website is image recognition. The first step is to connect webcam as follow

#### Webcam
Please refer to [Taking still photos with WebRTC](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Taking_still_photos). The way how promise used in react should be emphasized, related to lifecycle methods such as componentDidMount and componentWillUnmount. Please refer to this [repo](https://github.com/YCChenVictor/my_teachable_machine).

#### Take Picture


### What

