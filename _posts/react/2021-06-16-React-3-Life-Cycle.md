---
layout: post
title: (React_3) Life Cycle & State
description:
date: '2021-06-17'
categories: react
note: componentDidUpdate 的例子其實還沒測過，或許應該想一個更完整的例子，看未來會不會遇到。
---

## Introduction
Please refer to this [website](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) for the diagram of the life cycle. React life cycle:
<img src="/assets/img/react_lifecycle.png" alt="react_lifecycle">
As you can see, there are three main steps: Mounting (Birth), Updating (Growth), Unmounting (Death) of the components.

## Why
The essence of a framework is the life cycle of the components, the series of events from birth to death.

## How
I am going to go through all the methods in life cycle. Take the `Clock` as example, the following clock class can only show the fixed date and the life cyle method I use is only `render`
```
class Clock extends React.Component {

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is 2021-06-25.</h2>
      </div>
    );
  }

}
```
If I want to update current datetime on page refreshing at least, I need constructor for state changing.

### constructor
constructor is the method to initialize the object's state in a class, triggered when the creation of an object in a class occurs.

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

export default Clock;
```
note: 

1. `selectElementById` in Vanilla JS = In constructor, `this.inputField = React.createRef()` and in html: `<input type="text" ref={this.inputField} />`

However, the clock above cannot update datetime regularly, we need to use `componentDidMount`.

### componentDidMount
The concept of componentDidMount: it will be called as soon as this component mounted.
```
class Clock extends React.Component {

  ...

  componentDidMount() {
    setInterval(
      () => this.setState({
          date: new Date()
        }),
      1000
    );
  }

  ...

}
```
As you can see, there is a `setState` which can modify the state, `date` and the `setInterval` function tells this component to update state, `date` per second.

However, the setInterval will alaways work after the website initialize the `Clock`. As a result, we need a method to tell react remove this `setInterval` after this component disappear as follow:

### componentWillUnmount
```
class Clock extends React.Component {

  ...

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

  ...

}
```
As you can see, in the `componentWillUnmount` step, the process to update date regularly can be cleared.

### componentDidupdate
According to the official introduction, this step serves as a verification for component has been updated. For example, we can check whether one second passed on this clock and if not refresh the webpage (or fetch API again to update newest information)
```
componentDidUpdate(prevState) {
  if (this.state.date.toLocaleTimeString() !== prevState.date.toLocaleTimeString() + 1000) {
    window.location.reload();
  }
}
```

## The following methods are Uncommon React Lifecycle Methods
### shouldComponentUpdate()
### static getDerivedStateFromProps()
### getSnapshotBeforeUpdate()

## What

## Reference
[**State and Lifecycle**](https://reactjs.org/docs/state-and-lifecycle.html)

[**React Lifecycle Methods – A Deep Dive by Mosh Hamedani**](https://programmingwithmosh.com/javascript/react-lifecycle-methods/)

[**Life Cycle Diagram**](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
