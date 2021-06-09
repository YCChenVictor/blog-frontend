---
layout: post
title: (JavaScript_1) Overview
description: Introduction
date: '2021-04-26T09:55:52.243Z'
state: unmodified
categories: javascript
---

### Introduction

\> multi-paradigm: supporting imperative, procedural, OOP, and functional programming.

\> dynamic language: add or change object while the program is running.

\> types: `[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)`

\> operators:`+`, `-`, `*`, `/` ,`%` , `+=` ,`-=` , `<`, `>`, `<=` ,`>=` ,`===`

```
123 == '123'; // true (type can be different)123 === '123'; // false (type must be the same)
```

\> built-in objects: `[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) [Math](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)`

\> based on the Java and C languages

\> supports object-oriented programming with object prototypes, instead of classes

\> prototypal inheritance

### Why to learn it

\> Interactive Behavior to Web Pages

\> Creating Web and Mobile Apps

\> Build Web Server

\> Game Development

### Initialize The Picture

Let’s build a snake game with tutorial.

#### Initialize <canvas> and javascript

create `snakegame.html` and input the following

```
<canvas id="gameCanvas" width="400" height="400"><canvas>
```

id lets us to identify this `<canvas>` object and `width` and `height` will be the prop of this id and a function to start the game

<script>  
  function main() {  
  }  
</script>  
  

#### The full html file

<!DOCTYPE html>  
<html>  
  <head>  
    <title>Snake Game</title>  
  </head>  
  <body>  
    <canvas id="snakeboard" width="400" height="400"></canvas  
  </body>  
  <script>  
    function main() {  
    }  
  </script>  
</html>

### Let Snake And Frame Appear

add the following

<script>

...  
// Get the canvas element  
`const snakeboard = document.getElementById(`"snakeboard"`);`

// Return a two dimensional drawing context  
`const snakeboard_ctx = gameCanvas.getContext("2d");  
...`

</script>

`snakeboard` lets javascript to get the object with id, `"snakeboard"` and `getContext` tells javascript what the environment to render to be and in this example is 2D. And add function to let canvas appears:

function main () {  
  clearCanvas();  
}

`clearCanvas():`

// draw canvas  
function clearCanvas() {  
  // Draw a "border" around the entire canvas  
  snakeboard\_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);  
}

The method of `[strokeRect](https://www.w3schools.com/tags/canvas_strokerect.asp)`

#### Add snake

**Initial position of snake**

<script>

  ...  
  let snake = \[  {x: 200, y: 200},  {x: 190, y: 200},  {x: 180, y: 200},  {x: 170, y: 200},  {x: 160, y: 200},\];

  ...

```
</script>
```

The initial location of snake will be (200,200) ~ (160, 200) the length will be four 10 x 10.

**function to draw snake:**

// Draw the snake on the canvas  
function drawSnake() {  
  // Draw each part  
  snake.forEach(drawSnakePart)  
}

**function to draw snake parts**

// Draw one snake part  
function drawSnakePart(snakePart) {  
  // Draw a border around the snake part  
  snakeboard\_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);  
}

Notice all the inputs (not function) must be put before function main()

**Add snake function into main, which is going to run always**

// main function called repeatedly to keep the game running  
function main() {  
  clearCanvas();  
  drawSnake();  
}

#### The full html file

<!DOCTYPE html>  
<html>  
  <head>  
    <title>Snake Game</title>  
  </head>  
  <body>  
    <canvas id="snakeboard" width="400" height="400"></canvas  
  </body>  
  <script>  
    // Get the canvas element  
    const snakeboard = document.getElementById("snakeboard");  
    // Return a two dimensional drawing context  
    const snakeboard\_ctx = snakeboard.getContext("2d");  
    // init snake  
    let snake = \[  
      {x: 200, y: 200},  
      {x: 190, y: 200},  
      {x: 180, y: 200},  
      {x: 170, y: 200},  
      {x: 160, y: 200}  
    \]  
    // Start game  
    main();  
      
    // main function called repeatedly to keep the game running  
    function main() {  
      clearCanvas();  
      drawSnake();  
    }  
    // draw canvas  
    function clearCanvas() {  
      // Draw a "border" around the entire canvas  
      snakeboard\_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);  
    }  
    // Draw the snake on the canvas  
    function drawSnake() {  
      // Draw each part  
      snake.forEach(drawSnakePart)  
    }  
    // Draw one snake part  
    function drawSnakePart(snakePart) {  
      // Draw a border around the snake part  
      snakeboard\_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);  
    }  
  </script>  
</html>

### Let The Snake Move

#### **Add the function**

```
function move_snake() {    const head = {x: snake[0].x + dx, y: snake[0].y};  snake.unshift(head);  snake.pop();}
```

See the **initial position of snake** above, this function is going to add head to the beginning of the the array and remove the last element of the array.

And put the function to the main()

function main() {  
  clearCanvas();  
  move\_snake();  
  drawSnake();  
}

Then the plot will transform from

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__nh__P3DD__DpINTv4ca2G0og.png)

to

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__ROMYx8TcO56Tw0VxpOknXA.png)

meaning the functions in main has been run **one time**. However, we want it to move multiple times; as a result, we can add `setTimeout` which is going to run functions in it and then wait serval millisecond to do next round:

function main() {  
  setTimeout(function onTick() {  
    move\_snake();  
    drawSnake();  
    main();  
  }, 100)  
}

However, the plot is going to be

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__avPjt94uUgnQFi00cHvyug.png)

This is because the old picture did not refresh, so we add to the function clearCanvas()

function clearCanvas() {  
  //  Select the colour to fill the drawing  
  snakeboard\_ctx.fillStyle = "white";  
  // Draw a "filled" rectangle to cover the entire canvas  
  // snakeboard\_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);  
  ...  
}

### Let user can control the snake

#### Add the function to change the direction

```
function change_direction(event) {      const LEFT_KEY = 37;  const RIGHT_KEY = 39;  const UP_KEY = 38;  const DOWN_KEY = 40;   const keyPressed = event.keyCode;  const goingUp = dy === -10;  const goingDown = dy === 10;  const goingRight = dx === 10;    const goingLeft = dx === -10;   if (keyPressed === LEFT_KEY && !goingRight) {        dx = -10;    dy = 0;    }   if (keyPressed === UP_KEY && !goingDown) {        dx = 0;    dy = -10;  }   if (keyPressed === RIGHT_KEY && !goingLeft) {        dx = 10;    dy = 0;  }   if (keyPressed === DOWN_KEY && !goingUp) {        dx = 0;    dy = 10;  }}
```

This function means

If a user press keyboard,

the keyboard is left and it is not going right, add a square to the left … etc

#### Let user changes the direction of snake

Add the following

// let program get the user's pressing key  
document.addEventListener("keydown", change\_direction);

and modify the function `move_snake:`

function move\_snake() {  
  // Create the new Snake's head  
  const head = {x: snake\[0\].x + dx, y: snake\[0\].y + dy};  
  // Add the new head to the beginning of snake body  
  snake.unshift(head);  
  snake.pop();  
}

Then if the user press key, it will change dx and dy accordingly. We also need to specify the default dx and dy value outside the function.

...  
dx = 0  
dy = 0  
...

### Food Appears and Snake Eats Food one time

The following function return random number

```
function random_food(min, max) {     return Math.round((Math.random() * (max-min) + min) / 10) * 10;}
```

;with this function, we can give x and y position of food randomly:

food\_x = 0  
food\_y = 0  
`function gen_food() {    
  food_x = random_food(0, snakeboard.width - 10);  
  food_y = random_food(0, snakeboard.height - 10);  
  ...  
}`

and draw the food

```
function drawFood(){        snakeboard_ctx.fillStyle = 'lightgreen';  snakeboard_ctx.fillRect(food_x, food_y, 10, 10);}
```

and put the drawFood() to main function

function main() {  
  setTimeout(function onTick() {  
    clearCanvas();  
    `drawFood();` move\_snake();  
    drawSnake();  
    main();  
  }, 100)  
}

Then there would be food on the left and top corner

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__umv4uGYYRZjw9lFWtrb7eg.png)

Then after snake touch the food, the snake should add length and food should disappear.

#### snake add length

In the `move_snake()`

```
function move_snake() {    const head = {x: snake[0].x + dx, y: snake[0].y};  snake.unshift(head);
```

```
  const has_eaten_food = (snake[0].x === food_x && snake[0].y === food_y);  if (has_eaten_food) {    // Generate new food location    gen_food();  } else {    // Remove the last part of snake body    snake.pop();  }}
```

At the moment snake touching food, it will skip the `.pop()` and generate a new food.

### Reference

[**A re-introduction to JavaScript (JS tutorial)**  
_Why a re-introduction? Because JavaScript is notorious for being misunderstood. It is often derided as being a toy, but…_developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript "https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript")[](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript)

[**JavaScript Snake Game Tutorial: build a simple, interactive game**  
_The best way to improve your coding skills is practice practice practice. Put your JavaScript and HTML skills to work…_www.educative.io](https://www.educative.io/blog/javascript-snake-game-tutorial "https://www.educative.io/blog/javascript-snake-game-tutorial")[](https://www.educative.io/blog/javascript-snake-game-tutorial)