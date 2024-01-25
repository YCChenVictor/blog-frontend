# Title

## Why?

Mechanism to

1. post info for signing up
2. post info for logging in

## How?

## Example

### Button to pop modal

[modal]({{site.baseurl}}/react/2021/06/14/layout.html#modal)

### Navbar

```jsx
import React, { useContext, useState } from 'react';

function Navbar() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const LoginModalContext = React.createContext();
  const SignUpModalContext = React.createContext();

  return(
    <div id="navbar">
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-black mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <div className="absolute top-4 right-4 rounded-sm p-2">
              {showLoginButton ? (
                <button
                  onClick={setLoginModalOpen}
                  className="bg-white p-2"
                >Login
                </button>
              ) : (
                null
              )}
              {showSignUpButton ? (
                <button
                  onClick={setSignUpModalOpen}
                  className="bg-white p-2"
                >Signup
                </button>
              ) : (
                null
              )}
            </div>
            <LoginModalContext.Provider value={{ loginModalOpen, setLoginModalOpen }}>
              <LoginModal
                ariaHideApp={false}
                loginModalOpen={loginModalOpen}
                setLoginModalOpen={setLoginModalOpen}
                MyContext={LoginModalContext}
              />
            </LoginModalContext.Provider>
            <SignUpModalContext.Provider value={{ signUpModalOpen, setSignUpModalOpen }}>
              <SignUpModal
                ariaHideApp={false}
                SignUpModalOpen={signUpModalOpen}
                setSignUpModalOpen={setSignUpModalOpen}
                MyContext={SignUpModalContext}
              />
            </SignUpModalContext.Provider>
          </div>
        </div>
      </nav>
    </div>
  )
}
```

### Signup

```jsx
import React, { useContext, useState } from 'react';
import Modal from "react-modal";

function SignUpModal(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signUpModalOpen, setSignUpModalOpen } = useContext(props.MyContext);

  const PostSignUpInfo = (params) => {
    fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ params }),
    }).then((res) => {
      return res.json()
    }).then((data) => {
      localStorage.setItem('token', data.token);
    }).catch(error => {
      console.log(error)
    })
  }

  return(
    <Modal
      ariaHideApp={false} // TODO: remove it and fix the errors
      isOpen={Boolean(signUpModalOpen)}
      className='rounded-lg dark:bg-gray-700 max-w-2xl md:h-auto'
    >
      <h1 className="text-xl font-semibold text-gray-900 dark:text-white"
      >Sign Up</h1>
      <form>
        <label>
          email:
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br/>
        <label>
          password:
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </form>
      <div className='flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600'>
        <button
          onClick={() => PostSignUpInfo({ username:username, password:password })}
          className='block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >Sign Up</button>
        <button
          onClick={() => setSignUpModalOpen(false)}
          className='text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600'
        >Close</button>
      </div>
    </Modal>
  )
}

export default SignUpModal;
```

### Login

```jsx
import React, { useContext, useState } from 'react';
import Modal from "react-modal";

function LoginModal(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginModalOpen, setLoginModalOpen } = useContext(props.MyContext);

  const PostLoginInfo = (params) => {
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }).then((res) => {
      return res.json()
    }).then((data) => {
      localStorage.setItem('logged in', data.token);
      // close modal
      window.location.href = '/task_list';
      alert('login successfully')
    }).catch(error => {
      console.log(error)
    })
  }

  return(
    <Modal
      ariaHideApp={false} // TODO: remove it and fix the errors
      isOpen={Boolean(loginModalOpen)}
      className='rounded-lg dark:bg-gray-700 max-w-2xl md:h-auto'
    >
      <h1 className="text-xl font-semibold text-gray-900 dark:text-white"
      >Login</h1>
      <form>
        <label>
          email:
          <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          password:
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </form>
      <div className='flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600'>
        <button
          onClick={() => PostLoginInfo({ email:email, password:password })}
          className='block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >Login</button>
        <button
          onClick={() => setLoginModalOpen(false)}
        >Close</button>
      </div>
    </Modal>
  )
}

export default LoginModal;
```

## What?

* blog
* task

## Reference
