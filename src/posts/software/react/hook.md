# Title

## Purpose

React employs hooks for state and lifecycle management in functional components, enabling developers to reuse logic and enhance maintainability. Commonly used hooks, such as useState and useEffect, facilitate efficient state handling and lifecycle events.

## Concept

* `useState` for managing state
  * Updating array. Use `...`
    ```jsx
    import React, { useState } from 'react';

    const YourComponent = () => {
      const [components, setComponents] = useState([]);
    
      // Function to add a new component to the array
      const addComponent = (newComponent) => {
        setComponents((prevComponents) => [...prevComponents, newComponent]);
      };
    
      // Example of using the addComponent function
      const handleAddComponent = () => {
        const newComponent = // Your new component or value here;
        addComponent(newComponent);
      };
    
      return (
        <div>
          {/* Render your existing components here */}
          
          {/* Button to add a new component */}
          <button onClick={handleAddComponent}>Add Component</button>
        </div>
      );
    };
    
    export default YourComponent;
    ```
* `useEffect` for handling lifecycle events
* `useContext` for accessing the context API
* `useRef` for persisting values and interacting with the DOM imperatively

### Ajax

combined with `useEffect` and `useState`

```JSX
import React, { useState, useEffect } from 'react';

function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once on mount

  return (
    <div>
      {data ? (
        <p>Data loaded: {data}</p>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default MyComponent;
```

## Example

Let's use clock as example,

```jsx
import React, { useState, useEffect, useContext } from 'react';

// Create a context for managing the theme
const ThemeContext = React.createContext();

function Clock() {
  const [date, setDate] = useState(new Date()); // the states of the date and setDate method defined by useState
  const theme = useContext(ThemeContext); // add theme component through ThemeContext
  const inputRef = useRef(null); // useRef to hold a reference to the input element

  useEffect(() => { // when render Clock, call this method
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    // Focus on the input element when the component mounts (with useRef, it can find this component)
    inputRef.current.focus();

    return () => clearInterval(interval);
  }, []); // Empty dependency array to run effect only once on mount

  return (
    <div style={{ color: theme.textColor, background: theme.backgroundColor }}>
      <h1>Hello, world!</h1>
      <h2>It is {date.toLocaleTimeString()}.</h2>
      <input ref={inputRef} type="text" placeholder="Type something..." />
    </div>
  );
}

export default Clock;
```

## Reference

[10 React Hooks Explained // Plus Build your own from Scratch](https://www.youtube.com/watch?v=TNhaISOUy6Q)

[useRoute](https://blog.logrocket.com/how-react-hooks-can-replace-react-router/)

[life cycle methods in React Hooks?](https://stackoverflow.com/questions/53464595/how-to-use-componentwillmount-in-react-hooks)

[Using the Effect Hook](https://reactjs.org/docs/hooks-effect.html)

[how to share state across react components with context](https://www.digitalocean.com/community/tutorials/how-to-share-state-across-react-components-with-context)

[What is the equivalent of document.querySelector in React](https://bobbyhadz.com/blog/react-document-queryselector)
