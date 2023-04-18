---
layout: post
title:
description: ''
date: '2023-01-27'
categories: react
note:
mathjax:
mermaid:
p5:
threeJS:
anchor:
publish: true
---

## Introduction

This article describes the concept of component.

## Why?

With component, we can decompose whole frontend into reusable parts.

## How?

A really basic component: in `src`, create `components/counter.jsx` with

```javascript
import React, { useState, useRef } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0)
  // should add two example of useRef

  return (
    <React.Fragment>
      <span className = 'xxx'>
        {count}
      </span>
      <button
        onClick={() => setCount((prev) => prev + 1)}
      >
        Increment
      </button>
    </React.Fragment>
  );
}
 
export default Counter;
```

and import them

```jsx
import Counter from './components/counter.jsx'

...
<Counter />
...
```

It includes

* Naming of component must start from uppercase
* HTML & CSS: the styles
  * CSS: through `className`
* relationship between states and events
  * check [hook]({{site.baseurl}}/react/2021/06/17/React-4-Hook.html)

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


### child

To decompose elements with full functionality, check [prop]({{site.baseurl}}/react/2021/06/15/prop.html)

### class to functional

Form example, from

```jsx
class Clock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.setState({
          date: new Date()
        }),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }

}
```

to

```jsx
function Clock() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(
      () => setDate(new Date()), 1000
    );
    return () => clearInterval(interval);
  });

  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {date.toLocaleTimeString()}.</h2>
    </div>
  );
}

export default Clock;
```

The hook, `useState` to setup the date and `setDate` function to change the date. If I want `setInterval` to be disabled after this component closed, just like `componentWillUnmount`, adding `return () => clearInterval(interval);`

## What?

give an example

[test]({{site.baseurl}}/test/2021/06/14/xxx.html)

<img src="{{site.baseurl}}/assets/img/xxx.png" alt="">

## Reference
