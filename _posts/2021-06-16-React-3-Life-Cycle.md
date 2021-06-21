---
layout: post
title: (React_3) Life Cycle & State
description:
date: '2021-06-17'
categories: react
note: to be continued
---

這邊就是用 official 的文章來將 life cycle 跟 state 講清楚，就這樣，這篇文寫好後，應該先去把 javascript 的 callback hell 跟 promise 搞清楚

因為現在主要都是用 hook 在解決問題，而這是建立在 component + life cycle 簡化，所以了解完 component 後，我要來了解一下什麼是 life cycle。然後我應該要做下一件事情

## Introduction

## Why
skip

## How
For example, with following function
```
function Card() {
  return (
    <h1 className="blablabla">
      blablabla
    </h1>
  )
}
```
we can add [**virtual DOM**](https://programmingwithmosh.com/react/react-virtual-dom-explained/) to render it once the function called as follow
```
function Card() {
  const card = (    
    <h1 className="blablabla">
      blablabla
    </h1>
  );
  ReactDOM.render(
    card,
    document.getElementById('root')
  );
}
```
so that the virtual DOM can be inserted into the container DOM. Notice! If you put these code in a file loaded before `App.js` loaded, the virtual DOM would only insert once when reload; as a result, to see the effects please load your file correctly. Then, we may want to specify when these virtual dom loaded, meaning we need to have methods to observe the states changing.

To use these functions, we need to use serval hooks to listen to states changing. To use states and hooks, we need to turn function into components:
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

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```
As you can see, there is a constructor in the Clock and there is an object state in it. Then we can perform some behavior while states changing; for example, 這邊可以加一個 state: open 背景就變成紅色之類的。先跳過
```
先跳過
```
There are some default functions as follow: componentDidMount, componentWillUnmount
### componentDidMount
Actually, this is an async function, which is waiting this component to be mounted ((inserted into the tree); for example, if we want to get an element by id from the component, we can do
```
class Webcam extends Component {
  
  componentDidMount() {
    const video = document.getElementById("video");
  }

  render() {
    return (
      <div className="camera">
        <video id="video">Video stream not available.</video>
        <button id="startbutton">Take photo</button>
      </div>
    )
  }
}
```
Then we can access  `video div` from the component

## What

## Reference
[**State and Lifecycle**](https://reactjs.org/docs/state-and-lifecycle.html)
