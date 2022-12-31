---
layout: post
title:
description: ''
date: '2021-10-15'
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

This article describes how to build sign up and login with react to interact with backend.

## Why?

Mechanism to

1. post info for signing up
2. post info for logging in

## How?

### button to pop modal

[modal]({{site.baseurl}}/react/2021/06/14/layout.html#modal)

### sign up

```jsx
import React, { useContext, useState } from 'react';
import Modal from "react-modal";

function SignUpModal(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signUpModalOpen, setSignUpModalOpen } = useContext(props.MyContext);
  return(
    <Modal
      ...
    >
      ...
      <button
        onClick={() => PostSignUpInfo({ username:username, password:password })}
      >Sign Up</button>
      ...
    </Modal>
  )
}

function PostSignUpInfo(params) {
  fetch("http://localhost:3000/sign_up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ params }),
  })
    .then((r) => r.json())
    .then((user) => console.log(user));
}

export default SignUpModal;
```

## What?

TBC

## Reference
