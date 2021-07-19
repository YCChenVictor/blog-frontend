---
layout: post
title: (React_2) Component & Prop
description:
date: '2021-06-15'
categories: react
note: to be continued
---

## Summary
1. I am going to render component: Clock, trying to explain the concept of component and props.
2. The main concept: from functional form to class form.

## Why
Why to use component? skip

## How
### Basic Concept
A truly basic object can be created as follow, which is literally a function that returns an object with css and html and can be called somewhere else
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

### The difference between props & state

