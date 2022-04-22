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
  
* from class form to function form
* reuse single component in the parent component
* 

## Why

The reason to use component: `render()` method returns **react elements**, virtual DOM, which are JS objects in memory map to real DOM element. When a state changes, react change the virtual DOM first and then change the state of real DOM, making it just like JQuery with AJAX.

## How

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

### functional form, clock

```
function Clock() {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is 2021-06-21.</h2>
    </div>
  );
}
```

and we can call this `Clock` with two method:

First method: virtual dom
```
const clock = <Clock />;
ReactDOM.render(
  clock,
  document.getElementById('root')
);
```

Second method: render it with `date` input
```
function App() {
  return (
    <div>
      <Clock date="2021-06-21"/>
    </div>
  );
}
```
However, if we want to truly have a component customizable, then we need to modify these two functions as follow so that there are props for customization:
```
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date}.</h2>
    </div>
  );
}
```
As you can see, there is a way to change the date, `props.date`.
```
function App() {
  return (
    <div>
      <Clock date="2021-06-21"/>
      <Clock date="2021-06-22"/>
    </div>
  );
}
```
The following output:

<img src="/assets/img/component_date.png" alt="component_date"  width="400" height="300">

As you can see, the `<Clock />` can be customized; however, the clock can only show what inputted in `props`. We need to use `state` for clock to update the time regularly per second or at least update the current time. To use state, we need to turn this functional form into class form. The clock class could be
```
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

Then the current time can be updated in the `Clock` component. To let the clock update the time regularly we need use lifecycle methods which is going to be explained in the next article.

### class form, clock

### The difference between props & state

## reference

[Differences between Functional Components and Class Components in React](https://www.geeksforgeeks.org/differences-between-functional-components-and-class-components-in-react/)
