---
layout: post
title: (React) Shared States
description:
date: '2021-07-21'
categories: react
note:
---

## Introduction

## Why
skip

## How
The key tools are `useContext` and `useReducer`.

A. `useContext`: letting the nested components to use variable defined in the components outside. For example, the nested structure: `ThemedButton()` in `Toolbar()` in `App()`. With `ThemeContext` created by `React.createContext()` outside these components, we can access ThemeContext

```
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext();

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
```

B. `useReducer`:

## What


## Reference
[how to share state across react components with context](https://www.digitalocean.com/community/tutorials/how-to-share-state-across-react-components-with-context)

[useContext](https://reactjs.org/docs/hooks-reference.html#usecontext)
