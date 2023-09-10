# Title

## Purpose

Learning React is valuable for developers as it equips them with a powerful and widely-used [javascript](/blog/software/javascript/main) library, enabling the creation of efficient, modular, and interactive user interfaces that are in high demand across the web development industry.

## Concept

### Besides Development

#### start a project

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
  * File: There is no strict convention for naming files in React, but **camel case** is more commonly used for component files while snake case is more commonly used for non-component modules or helper functions.

#### Environment

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

#### Package

* Update npm/yarn
* Remove unused package manually: walk through `package.json` and just remove the lines
* Detect bundle size of packages
  * Install `webpack-bundle-analyzer`
    ```bash
    npm install --save-dev webpack-bundle-analyzer
    # or
    yarn add --dev webpack-bundle-analyzer
    ```
  * Modify `webpack.config.js`
    ```javascript
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

    module.exports = {
      // ...your existing webpack configuration...
      plugins: [
        new BundleAnalyzerPlugin(),
        // ...other plugins...
      ],
    };
    ```
* ESLint can detect unused imports
  * Install
    ```bash
    npm install --save-dev eslint-plugin-unused-imports
    # or
    yarn add --dev eslint-plugin-unused-imports
    ```
  * config (.eslintrc)
    ```JSON
    {
      "plugins": ["unused-imports"],
      "rules": {
        "unused-imports/no-unused-imports": "error"
      }
    }
    ```
* Enable tree shaking in webpack configuration. It can detect installed but unused packages.
  * If we use react, then this is already enabled.
  * For example, if you use a utility library like Lodash but only utilize a couple of methods from it, tree-shaking will ensure that only those specific methods are included in the bundle, not the entire library.
  * However, if you have installed packages via npm or yarn but haven't imported or used any of their exports in your code, the tree-shaking process won't automatically remove those packages from your node_modules directory.
* Use `depcheck`
  * Install
    ```bash
    npm install -g depcheck
    ```
  * Use it
    ```bash
    depcheck
    ```
  * Then you can upm uninstall the unused package it lists

#### Deploy

##### Github

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

Note: If you cannot deploy successfully, just build it and then push it to gh-pages branch. Or use Netlify.

##### Netlify

* install
  ```bash
  npm install netlify-cli -g
  ```
* build
  ```bash
  npm run build
  ```
* deploy
  ```bash
  netlify deploy
  ```
* cd on github
* CD: Just setup it in netlify

#### Tailwind

* Install: `yarn add tailwind`
* [Official guide](https://tailwindcss.com/docs/guides/create-react-app)
* And import it in `index.js` with
  ```javascript
  import './index.css';
  ```
* For the basic css concept, please refer to [CSS]

#### fontawesome

* [react-fontawesome](https://www.npmjs.com/package/@fortawesome/react-fontawesome) for icon
* [fortawesome/free-solid-svg-icons](https://www.npmjs.com/package/@fortawesome/free-solid-svg-icons) for icon

### Component

In React, a component is a self-contained, reusable piece of code that defines a specific part of a user interface. Components can be combined to create complex UIs, and they can be managed and updated independently, making them a powerful tool for building scalable and modular applications. For more information, please refer to [component]

### Hook

[hook]

### Routes

In React, routes are used to define different paths and URLs within a web application. react-router-dom is a popular library used to implement routing in React applications. For more information, please refer to [routes]

### API

React uses HTTP requests to communicate with APIs and obtain data that can be rendered dynamically in the user interface. This allows for interactive and responsive web applications. For more information, please refer to [api]

### layout

Layout in React refers to the arrangement and positioning of components on a web page or application. It involves creating a hierarchy of components that define the structure of the user interface and applying styles to position and align them in a visually appealing way. For more information, please refer to [layout]

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

## Example

### sign up and login mechanism

[sign up and login mechanism]

### Markdown

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

#### Image

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

#### Code Block

* Install package
  ```bash
  npm i react-syntax-highlighter
  ```
* In the md file, add a code block
  ```bash
  This is a code block
  ```
* In `ReactMarkdown`, add `code`
  ```jsx
  ...
  <ReactMarkdown
    components={{
      ...
      code: ({ node, ...props }) => (
        RenderCodeBlock(props)
      )
    }}
    ...
  >
    {markdownContent}
  </ReactMarkdown>
  ```
* RenderCodeBlock

#### Mermaid

The concept is turn it into svg first and then render the svg.

* In `ReactMarkdown`, add code
  ```jsx
  <ReactMarkdown
    components={{
      ...
      code: ({ node, ...props }) => {
        if (props.className === 'language-mermaid') {
          return RenderMermaid(props)
        } else {
          return RenderCodeBlock(props)
        }
      }
    }}
    ...
  >
    {markdownContent}
  </ReactMarkdown>
  ```
* MermaidJS
  ```javascript
  const RenderMermaid = (props) => {
    const markId = useRef(`mark${Math.floor((Math.random() * 100000) + 1)}`)
    const [svg, setSvg] = useState('')
    useEffect(() => {
      const renderMermaid = async () => {
        const svg = await mermaid.render(markId.current, props.children[0])
        setSvg(svg.svg)
      }
      renderMermaid()
    }, [])
    return (
      <div dangerouslySetInnerHTML={{ __html: svg }}></div>
    )
  }
  ```

#### mathjax

add remarkMath, rehypeKatex

```javascript
<ReactMarkdown
  components={{
    ...
  }}
  remarkPlugins={[remarkGfm, remarkMath]}
  rehypePlugins={[rehypeKatex]}
>
  {markdownContent}
</ReactMarkdown>
```


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

[react-markdown的使用](https://www.cnblogs.com/mbbk/p/react-markdown.html)

[How to Integrate Next, React, Mermaid, and Markdown](https://www.andynanopoulos.com/blog/how-to-integrate-next-react-mermaid-markdown)
