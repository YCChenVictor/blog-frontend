---
layout: post
title:
description: ''
date: '2021-06-13'
categories: react
note: what section 要放實際專案，把 CRUD 拉出來
mathjax:
mermaid: true
p5:
publish: true
---

## Introduction

TBC

## Why?

Learning React is valuable for developers as it equips them with a powerful and widely-used JavaScript library, enabling the creation of efficient, modular, and interactive user interfaces that are in high demand across the web development industry.

## How?

### start a project

* Create react app with following command
  ```bash
  npx create-react-app@latest your-project-name
  cd your-project-name
  yarn start
  ```
* Remove all the files in `/src` and add `index.js` in it with following code:
  ```javascript
  import { createRoot } from 'react-dom/client'
  
  const element = <h1>Hello World</h1>;
  createRoot(document.getElementById('root')).render(
    element
  )
  ```
  * which will create a JS object and render it into the DOM with id = root in the `public/index.html`
* Naming
  * File: There is no strict convention for naming files in React, but camel case is more commonly used for component files while snake case is more commonly used for non-component modules or helper functions.

### Environment

Use `process.env` to get environment variable; for example,

```javascript
import React from 'react';

function App() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = process.env.REACT_APP_API_URL;

  // Use the environment variables in your component logic
  // ...

  return (
    <div>
      {/* Render your component */}
    </div>
  );
}

export default App;
```

And use `process.env.NODE_ENV` to know current environment; for example,

```javascript
import React from 'react';

function App() {
  const isProduction = process.env.NODE_ENV === 'production';

  // Use the environment variable in your component logic
  // ...

  return (
    <div>
      {/* Render your component */}
    </div>
  );
}

export default App;
```

### Deploy

* install `gh-pages`
  ```bash
  npm install gh-pages --save-dev
  ```
* In `package.json`, add
  ```JSON
  ...
  "homepage": "http://{github-username}.github.io/{repo-name}",
  ...
  "scripts": {
    "predeploy" : "npm run build",
    "deploy" : "gh-pages -d build",
  }
  ```
* In directory, run
  ```bash
  npm run deploy
  ```

### Component

In React, a component is a self-contained, reusable piece of code that defines a specific part of a user interface. Components can be combined to create complex UIs, and they can be managed and updated independently, making them a powerful tool for building scalable and modular applications. For more information, please refer to [component]({{site.baseurl}}/react/2023/01/27/component.html).

### Hook

[hook]({{site.baseurl}}/react/2023/01/27/component.html)

### Routes

In React, routes are used to define different paths and URLs within a web application. react-router-dom is a popular library used to implement routing in React applications. For more information, please refer to [routes]({{site.baseurl}}/react/2023/04/21/routes.html).

### API

React uses HTTP requests to communicate with APIs and obtain data that can be rendered dynamically in the user interface. This allows for interactive and responsive web applications. For more information, please refer to [api]({{site.baseurl}}/react/2022/09/14/api.html)

### layout

Layout in React refers to the arrangement and positioning of components on a web page or application. It involves creating a hierarchy of components that define the structure of the user interface and applying styles to position and align them in a visually appealing way. For more information, please refer to [layout]({{site.baseurl}}/react/2021/06/14/layout.html).

### Assets

Usually, we `import` the assets; for example,

```javascript
import React from 'react';
import logo from '../assets/logo.png';

const MyComponent = () => {
  return (
    <div>
      <img src={logo} alt="Logo" />
    </div>
  );
};

export default MyComponent;
```

## What?

### sign up and login mechanism

[sign up and login mechanism]({{site.baseurl}}/react/2021/10/15/sign-up-and-login.html)

### Youtube Videos

To embed videos in a React application, you can use the <iframe> HTML element along with the appropriate video embed code provided by the video hosting platform (such as YouTube or Vimeo).

* create component to put videoUrl in iframe
  ```JSX
  import React from 'react';
  
  const VideoPlayer = ({ videoUrl }) => {
    return (
      <div>
        <iframe
          src={videoUrl}
          width="560"
          height="315"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    );
  };
  
  export default VideoPlayer;
  ```

### Third Party Library

#### Tailwind

* Install: `yarn add tailwind`
* [Official guide](https://tailwindcss.com/docs/guides/create-react-app)
* And import it in `index.js` with
  ```javascript
  import './index.css';
  ```
* For the basic css concept, please refer to [CSS]()

#### Markdown

* Install
  ```bash
  npm i react-markdown
  ```
* Code Example: It will import the markdown file and render it with `ReactMarkdown`
  ```javascript
  import React, { useState, useEffect } from 'react';
  import ReactMarkdown from 'react-markdown'
  import file from '../posts/self/software.md'
  
  const Article = () => {
    const [markdownContent, setMarkdownContent] = useState('');
  
    useEffect(() => {
      fetch(file).then((res) => res.text()).then(text => setMarkdownContent(text))
    }, []);
  
    return (
      <div>
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </div>
    )
  }
  
  export default Article
  ```

##### Image

* In md file
  ```HTML
  ![radio states coverage](assets/img/radio_states_coverage)
  ```
* In `ReactMarkdown`, add img
  ```javascript
  <ReactMarkdown
    ...
    components={{
      ...
      img: ({ node, ...props }) => (
        RenderImage(props)
      )
    }}
    ...
  >
    {markdownContent}
  </ReactMarkdown>
  ```
* RenderImage
  ```javascript
  ...
  const RenderImage = (props) => {
    const [image, setImage] = useState('')
    useEffect(() => {
      const fetchImage = async () => {
        const imgModule = await import(`../${props.src}.png`)
        setImage(imgModule.default)
      }
      fetchImage()
    }, []);
  
    return (
      <img src={image}></img>
    )
  }
  
  export default RenderImage
  ```

##### Code Block

* Install package
  ```bash
  npm i react-syntax-highlighter
  ```
* In the md file, add a code block
  ```
  This is a code block
  ```
* In `ReactMarkdown`, add `code`
* RenderCode
  ```
  ```

#### Other

* [react-fontawesome](https://www.npmjs.com/package/@fortawesome/react-fontawesome) for icon
* [fortawesome/free-solid-svg-icons](https://www.npmjs.com/package/@fortawesome/free-solid-svg-icons) for icon
* [mui](https://mui.com/getting-started/installation/) for react components


## Reference

[React JS - React Tutorial for Beginners](https://www.youtube.com/watch?v=Ke90Tje7VS0)

[Build a 3D World in React with ThreeJS and React Three Fiber](https://www.youtube.com/watch?v=9ZEjSxDRIik)

[【React教學】一個範例讓你搞懂useState, useRef, useEffect, 5分鐘快速教學](https://www.youtube.com/watch?v=q0C5g4WIrKU&t=132s)

[Hooks at a Glance](https://reactjs.org/docs/hooks-overview.html)

[React useRef Hook](https://www.w3schools.com/react/react_useref.asp)

[react-sidebar-menu-medium](https://codesandbox.io/s/78ize)

[AJAX and APIs](https://reactjs.org/docs/faq-ajax.html)

[markdown to jsx](https://www.google.com/search?q=how+to+load+markdown+file+inreact&oq=how+to+load+markdown+file+inreact&aqs=chrome..69i57j33i10i160l3j33i22i29i30.10981j0j7&sourceid=chrome&ie=UTF-8#kpvalbx=_rc-vZNq5B4bz-Qa_oorIAQ_31)

[Using Dynamic Anchor Links in React Markdown](https://spin.atomicobject.com/2022/11/17/dynamic-anchor-tags/)
