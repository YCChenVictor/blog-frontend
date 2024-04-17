# Title

## Purpose

Components in React are used to modularize and organize the user interface into reusable, independent units of functionality.

Provide more context on why React components are essential and how they contribute to building scalable applications.

## Concept

### Structure

A really basic component: in `src`, create `components/counter.jsx` with

```javascript
import React, { useState } from 'react';

const Counter = () => {
  // State for the counter value
  const [counterValue, setCounterValue] = useState(0);

  // Function to handle incrementing the counter value
  const incrementCounter = () => {
    setCounterValue(prevValue => prevValue + 1);
  };

  return (
    <div>
      {/* Display the counter value */}
      <span className="counter-value">{counterValue}</span>

      {/* Button to increment the counter */}
      <button className="increment-button" onClick={incrementCounter}>
        Increment
      </button>
    </div>
  );
};

export default Counter;
```

and import them

```jsx
import Counter from './components/counter.jsx'

<Counter />
```

### Render virtual DOM

Clarify the explanation of the virtual DOM and its role in React's rendering process. Simplify complex concepts to make them more accessible to readers who may be new to React.

The reason to use component: `render()` method returns **react elements**, virtual DOM, which are JS objects in memory map to real DOM element. When a state changes, react change the virtual DOM first and then change the state of real DOM, making it just like JQuery with AJAX.

### insert components

React accept pass array of components into a component and render them; Take `sidebar` as example,

```jsx
function SidebarLayout() {
  const [menuItems, setMenuItems] = useState('testing')
  useEffect(() => {
    const queriedTitles = [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')];
    const titles = queriedTitles.filter((item) => item.tagName !== 'H1').map(
      item => ({id: item.id, tag: item.tagName.match(/\d+/)[0], position: queriedTitles.indexOf(item)})
    )
    const menuItemsDesired = titles.map((title) => (<MenuItem>{title.id}</MenuItem>))
    setMenuItems(menuItemsDesired)
  }, []);
  return (
    <div style={{ display: 'flex', height: '100%' }} >
      <ProSidebarProvider>
        <BrowserRouter>
          <Sidebar>
            <Menu>
              {menuItems}
            </Menu>
          </Sidebar>
        </BrowserRouter>
      </ProSidebarProvider>
    </div>
  );
}
```

### Conditional Rendering

In React, conditional rendering allows developers to show different parts of a component based on certain conditions.

```javascript
import React from 'react';

function MyComponent(props) {
  const isLoggedIn = props.isLoggedIn;
  
  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome back!</h1>
      ) : (
        <h1>Please log in.</h1>
      )}
    </div>
  );
}

export default MyComponent;
```

In this example, we use the ternary operator (? :) to conditionally render different content inside the return statement based on the value of isLoggedIn. If isLoggedIn is true, the component will render a welcome message, and if it's false, the component will render a login prompt. The JSX syntax allows us to include JavaScript expressions inside curly braces {}, so we can evaluate the condition and render the appropriate content inline.

#### condition

We can use concept of ternary to achieve it

* Conditional rendering
  ```JSX
  {false ? (
  <button
    onClick={setTaskModalOpen}
    className="bg-white p-2"
  >Create Task</button>) : ('')}
  ```
* Conditional Style
  ```JSX
  const MyComponent = ({ isHighlighted }) => {
    const style = {
      color: isHighlighted ? 'red' : 'black',
      fontWeight: isHighlighted ? 'bold' : 'normal'
    }
  
    return (
      <div style={style}>
        Hello World
      </div>
    )
  }
  ```

### child

#### Benefits

Emphasize the benefits of component decomposition and how it contributes to code maintainability and reusability.

#### Decomposing

React supports decomposing big component to small components and we can use props to pass different variables to the small components to render the same framework with different data. For example, we can decompose the `Comment` with `AuthorInfo` and `CommentContent` as follow:

From

```javascript
import React from 'react';

const Comment = ({ author, content, timestamp }) => {
  return (
    <div className="comment">
      <h4>{author}</h4>
      <p>{content}</p>
      <span>{timestamp}</span>
    </div>
  );
};

export default Comment;
```

To

```javascript
import React from 'react';
import AuthorInfo from './AuthorInfo';
import CommentContent from './CommentContent';

const Comment = ({ author, content, timestamp }) => {
  return (
    <div className="comment">
      <AuthorInfo author={author} timestamp={timestamp} />
      <CommentContent content={content} />
    </div>
  );
};

export default Comment;
```

Where

```javascript
import React from 'react';

const AuthorInfo = ({ author, timestamp }) => {
  return (
    <div className="author-info">
      <h4>{author}</h4>
      <span>{timestamp}</span>
    </div>
  );
};

export default AuthorInfo;
```

and

```javascript
import React from 'react';

const CommentContent = ({ content }) => {
  return (
    <div className="comment-content">
      <p>{content}</p>
    </div>
  );
};

export default CommentContent;
```

### Wait until Data Prepared

* purpose: Explain the purpose of waiting for data and how conditional rendering ensures a seamless user experience.
* concept

We can use conditional rendering to wait until data fetched

```javascript
const Article = () => {
  ...
  const [markdownContent, setMarkdownContent] = useState('');
  const [rawTitles, setRawTitles] = useState([]);

  useEffect(() => {
    fetch(file)
      .then((res) => res.text())
      .then(text => {
        const parsedHTML = marked.parse(text)
        const container = document.createElement('div')
        container.innerHTML = parsedHTML
        const tags = Array.from(container.querySelectorAll('h2, h3, h4, h5, h6')).map((tag) => tag.textContent)
        setRawTitles(tags)
        setMarkdownContent(text)
      })
  }, []);

  return (
    <div className='bg-gray-400 px-2 py-2 lg:px-8 lg:py-4 xl:px-72 xl:py-6 2xl:px-96 2xl:py-8'>
      {rawTitles.length > 0 ? (
        <div>
          <SidebarLayout rawTitles={rawTitles} />
          <ReactMarkdown>{markdownContent}</ReactMarkdown>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}
```

### Component interactions

Provide more context on the different types of component interactions, such as parent-child and sibling components.

Include examples demonstrating various interaction patterns, such as passing data between components and synchronizing component behavior.


#### On the same level

Say we want the width of a component to listen to another component's width

```jsx
import React, { useEffect, useRef, useState } from 'react';

const ParentComponent = () => {
  const [componentAWidth, setComponentAWidth] = useState(0);

  const updateComponentAWidth = (width) => {
    setComponentAWidth(width);
  };

  const componentARef = useRef(null);

  useEffect(() => {
    // Get the width of ComponentA and call the updateComponentAWidth function
    if (componentARef.current) {
      const width = componentARef.current.clientWidth;
      updateComponentAWidth(width);
    }
  }, []);

  const componentBStyle = {
    width: `${componentAWidth}px`, // Set the width of ComponentB based on ComponentA's width
    /* Add any other styles you desire */
  };

  return (
    <div>
      <div ref={componentARef}>
        {/* Your ComponentA content */}
      </div>
      <div style={componentBStyle}>
        {/* Your ComponentB content */}
      </div>
    </div>
  );
};

export default ParentComponent;
```

#### On different level

Say if there is an operation in child component, then we want parent component to do actions accordingly

* Parent: Pass the method to child component
  ```jsx
  // ParentComponent.js
  import React from 'react';
  import ChildComponent from './ChildComponent';
  
  const ParentComponent = () => {
    const handleDataFromChild = (data) => {
      console.log('Data received from child:', data);
      // Do whatever you want with the data received from the child
    };
  
    return (
      <div>
        <ChildComponent onEmitData={handleDataFromChild} />
      </div>
    );
  };
  
  export default ParentComponent;
  ```
* Child: Use the method passed from parent component
  ```jsx
  // ChildComponent.js
  import React from 'react';
  
  const ChildComponent = ({ onEmitData }) => {
    const handleEmit = () => {
      const dataToSend = 'Hello from child!';
      // Call the callback function with the data to emit it to the parent
      onEmitData(dataToSend);
    };
  
    return (
      <div>
        <button onClick={handleEmit}>Emit Data to Parent</button>
      </div>
    );
  };
  
  export default ChildComponent;
  ```

## Example

Provide a complete example demonstrating the concepts discussed in the article. This example could showcase the creation of a simple React application with multiple components, state management, and interactions.

## Reference

## Other topics

React Props and Prop Types:

Explain the concept of props in React and how they allow components to accept inputs.
Introduce PropTypes for type checking props to ensure component reliability and catch bugs early in development.
React Hooks:

Provide an overview of React hooks such as useState, useEffect, useContext, etc., and their role in functional components.
Explain how hooks enable developers to add state and side-effects to functional components without using class components.
React Context API:

Introduce the Context API as a mechanism for passing data through the component tree without having to pass props manually at every level.
Demonstrate how to create and consume context in React applications to manage global state or provide theme configurations.
React Router:

Discuss React Router as a library for handling navigation in React applications.
Provide examples of how to set up routing, define routes, and handle navigation events in React Router.
React Lifecycle Methods:

Explain the lifecycle of a React component and the various lifecycle methods available in class components.
Discuss how lifecycle methods are used for initialization, updating, and cleanup in React applications.
React Forms and Form Handling:

Cover techniques for handling forms in React applications, including controlled components and form validation.
Provide examples of form submission, handling user input, and updating state based on form values.
React Performance Optimization:

Discuss best practices for optimizing React application performance, including minimizing re-renders, using memoization techniques, and lazy loading components.
Error Handling in React:

Explain strategies for handling errors in React applications, including error boundaries, componentDidCatch lifecycle method, and error logging.
Server-Side Rendering (SSR) and Client-Side Rendering (CSR):

Compare and contrast server-side rendering and client-side rendering approaches in React applications.
Discuss the benefits and trade-offs of each approach and when to use them based on project requirements.
Testing React Components:

Introduce testing methodologies for React components, including unit testing with Jest and Enzyme, and end-to-end testing with tools like Cypress.
