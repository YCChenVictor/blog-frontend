---
layout: post
title: component & prop
description:
date: '2021-06-15'
categories: react
note: 這篇文章要作為補充 overview 那篇文章的，等到 overview 完成後
---

## Introduction

I am going to render component, Clock, trying to explain the concept of component and props and compare the characteristics between functional form and class form. Both functional form and class form can create components with same effects in different approach.

1. class form, clock
2. functional form, clock
3. class or functional form?

## Why

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

The reason to use component: `render()` method returns **react elements**, virtual DOM, which are JS objects in memory map to real DOM element. When a state changes, react change the virtual DOM first and then change the state of real DOM, making it just like JQuery with AJAX.

## How

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
