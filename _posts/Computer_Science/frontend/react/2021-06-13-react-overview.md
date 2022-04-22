---
layout: post
title: (react) overview
description: ''
date: '2021-06-13'
categories: react
note: tutorial 的問題是 component 還是用 class form， CSS 還是用 bootstrap，等到寫完以後，tree 的部分要換成新的網頁
mathjax:
mermaid: true
p5:
---

## Introduction

I am going to follow the tutorial to build a website with react and use it as a benchmark for other deeper topics in react.

1. tree
2. hello world
3. third party library
4. component
5. events
6. basic commands

## Why?

I want to build a world based on JS frontend. The result would be as follow (just like the tutorial):

<img src='/assets/img/react_simple_calculator.png' class='w-1/2' alt='react_simple_calculator'>

## How?

### tree

The tree of this app:

<div class="mermaid">
graph TB
  id1((App)) --> id2((navbar))
  id1((App)) --> id4((counter))
  id4((counter)) --> id5((reset))
  id4((counter)) --> id6((row))
  id6((row)) --> id7((total))
  id6((row)) --> id8((plus))
  id6((row)) --> id9((minus))
  id6((row)) --> id10((delete))
</div>

all the nodes represent a component

### hello world

remove all the files in `/src` and add `index.js` with following code:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

const element = <h1>Hello World</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

which will create a JS object and render it into the DOM with id = root in the `public/index.html`

### third party library

just install it with `npm install xxx` and follow the official guides.

* [install tailwind](https://tailwindcss.com/docs/guides/create-react-app)

for more detail please refer to: 2021-06-14-third-party-library

### component

Here I only show how to make a workable component for this app. For more concepts, please refer to 2021-06-15-component-and-prop.md

Add a component file with file name: `components/counter.jsx` in the `src` path and the coding as follow:

```jsx
import React, { Component } from 'react';

class Counter extends Component {
  state = {
    count: 0,
    tags: ['tag1', 'tag2', 'tag3']
  }

  renderTags() {
    if (this.state.tags.length === 0) return <p>There is no tags!</p>;
    return <ul>{this.state.tags.map(tag => <li key={ tag }>{ tag }</li>)}</ul>
  }

  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 })
  }

  render() {
    return (
      <React.Fragment>
        <span className={this.getCountClasses()}>
          {this.formatCount()}
        </span>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={this.handleIncrement}
        >
          Increment
        </button>
        <div>
          { this.state.tags.length === 0 && 'Please create a new tag!' }
          { this.renderTags() }
        </div>
      </React.Fragment>
    );
  }

  getCountClasses() {
    let classes = 'rounded-md m-2 p-1 ';
    classes += this.state.count === 0 ? 'bg-yellow-300' : 'bg-blue-500';
    return classes;
  }

  formatCount() {
    const { count } = this.state;

    return count === 0 ? 'Zero' : count;

  }
}
 
export default Counter;
```

You can change the value of count and see the effect on the webpage.

import this component in `./src/index.html` and render it as follow:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Counter from `./components/counter`;

ReactDOM.render(<Counter />, document.getElementById('root'));
```

notes:

* `const { count } = this.state;` picks the count property of the object, this.state by object destucturing
* use `{}` to render data dynamically
* use className to change the style of the components
* change the color of `count` accoring to the value, 0 to yellow and other number to blue
* when using the `map` method, add `key` for react to know the relationship of virtual DOM and real DOM
* conditional rendering: can render a result based on the logic, just like `renderTags`
* the logic of `true && 'string'` in JS will return 'string'

### events

In the component section, you can see button for increments, the `onClick` defines what method to be executed once users click the button; for example, we can have a following button

```jsx
handleIncrement() {
  console.log('Increment Clicked');
}

<button
  onClick={this.handleIncrement}
>
```

Then it will log the string, Increment Clicked, in console once user clicks the button; however, if we want to change the state with this function, we need to change the method into

```jsx
handleIncrement = () => {
  console.log('Increment Clicked', this);
}
```

so that this method can get the `this` in javascript or use `constructor` in the class, `Component` as follow

```jsx
constructor() {
  super();
  this.handleIncrement = this.handleIncrement.bind(this);
}

handleIncrement() {
  console.log('Increment Clicked', this);
}
```

See 2021-06-16-life-cycle.md for further discussion. So the following function can change the `count` state when button been clicked

```jsx
handleIncrement = () => {
  this.setState({ count: this.state.count + 1 })
}
```

Once user click the button and trigger the `handleIncrement`, react will change the state in virtual DOM -> compare the new virtual DOM and the old virtual DOM to know the key difference -> update the place with different values compared by virtual DOMs in real DOM. See 2021-06-15-component-and-prop.md for further discussion about how virtual DOM and real DOM work in react.

#### passing arguments

If we want to pass arguments to the event handler function, we can do the following:

```jsx
handleIncrement = (product) => {
  console.log(product)
  this.setState({ count: this.state.count + 1 })
}
onClick={() => this.handleIncrement({ id: 1 })}
```

Actually, I do not know why we need to write it as showing above. I will dive into it.

### basic commands

1. run project: `npm start`

## Reference

[React JS - React Tutorial for Beginners](https://www.youtube.com/watch?v=Ke90Tje7VS0)
