---
layout: post
title: (react) component and prop
description:
date: '2021-06-15'
categories: react
note:
---

## Introduction

Given 2021-06-13-react-overview.md, let us start to research component with topics as follow:
  
* reuse single component in the parent component
* the concept of props
* from class form to function form

## Why

The reason to use component: `render()` method returns **react elements**, virtual DOM, which are JS objects in memory map to real DOM element. When a state changes, react change the virtual DOM first and then change the state of real DOM, making it just like JQuery with AJAX.

## How

### reuse single component in the parent component

Given the counter component in 2021-06-13-react-overview.md, we can render this component by creating a file, `counters.jsx` in folder, `src/components` and create parent component, `Counters` as follow:

```jsx
import React, { Component } from 'react';
import Counter from './counter';

class Counters extends Component {
  state = {}
  render() {
    return (
      <div>
        <Counter />
        <Counter />
        <Counter />
        <Counter />
      </div>
    );
  }
}
```

and the following render in `index.js`

```javascript
ReactDOM.render(<Counters />, document.getElementById('root'));
```

Then it looks like

<img src="/assets/img/multiple_single_component.png">

We can use map to reduce the duplicate codings and input state data as follow:

```jsx
import React, { Component } from 'react';
import Counter from './counter';

class Counters extends Component {
  state = {
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
    ]
  }
  render() {
    return (
      <div>
        {this.state.counters.map(counter => <Counter key={counter.id}/>)}
      </div>
    );
  }
}
```

### the concept of props

* through attribute
* through children
* prop vs state

#### through attribute

In the above section, you can see the attribute, `value`, in the state, we can pass it to the counter with

```javascript
<div>
  {this.state.counters.map(counter => <Counter key={counter.id} value={counter.value}/>)}
</div>
```

Note that the special attribute, `key` is for unique identify elements and not a prop. Now the props are passed to `<Counter />` then we can use props as follow:

```jsx
import React, { Component } from 'react';

class Counter extends Component {
  state = {
    value: this.props.value,
  }

  render() {
    console.log(this.state.value);
    return (
      <div>
        <span className={this.getCountClasses()}>
          {this.formatCount()}
        </span>
        ...
      </div>
    );
  }
  
  formatCount() {
    const { count } = this.state;
    return count === 0 ? 'Zero' : value;
  }
}

export default Counter;
```

so everytime it render this virtual DOM, the state will be updated

#### through children

In `counters`,

```javascript
<div>
  {this.state.counters.map(counter =>
    <Counter key={counter.id} value={counter.value}>
      <h4>Counter #{counter.id}</h4>
    </Counter>
  )}
</div>
```

and in `counter`,

```javascript
render() {
  return (
    <div>
      {this.props.children}
      ...
    </div>
  );
}
```

Then it looks like

<img src="/assets/img/counters_with_title.png">

#### prop vs state

`state` can only be used in the component itself and `prop` is passed to the component from outside. We cannot modify the prop directly in the component class; instead we need to pass the `prop` to `state` and then modify the `state` within the component.

Because `state` can only be used in the component itself, we can only add the modify method in the component using the state; for example, in `counters`, add `handleDelete` as follow

```javascript
class Counters extends Component {
  ...
  handleDelete = () => {
    console.log('Delete the counter')
  }

  render() {
    return (
      <div>
        {this.state.counters.map(counter =>
          <Counter
            ...
            onDelete={this.handleDelete} 
            ...
          >
            ...
          </Counter>
        )}
      </div>
    );
  ...
}
```

and add a button for deletion in class `Counter` as follow

```jsx
class Counter extends Component {
  ...
  render() {
    return (
      <div>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => this.props.onDelete()}
        >
          Delete
        </button>
      </div>
    );
  }
  ...
}
```

When we click delete button in `<Counter>`, it will trigger `handleDelete` in `Counters`

### from class form to function form

A typical class form component in react is composed by `state` and `render()`

1. The data to be displayed while rendering is in state
2. render method describe what the UI should look like when rendering

```javascript
class Card {
  state = {};

  render() {
    
  }
}
```

```jsx
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date}.</h2>
    </div>
  );
}
```

to

```jsx
class Clock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {date: new Date()};
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

## reference

[Differences between Functional Components and Class Components in React](https://www.geeksforgeeks.org/differences-between-functional-components-and-class-components-in-react/)

[React JS - React Tutorial for Beginners](https://www.youtube.com/watch?v=Ke90Tje7VS0)
