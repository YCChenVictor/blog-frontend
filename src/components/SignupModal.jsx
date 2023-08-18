import React, { useState } from 'react';
import Modal from "react-modal";

function SignupModal(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
      isOpen={true}
      className='rounded-lg md:h-auto fixed inset-0 flex items-center justify-center'
      appElement={document.getElementById('root')}
    >
      <div className="p-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-4">
          Sign Up
        </h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
              <input
                type="text"
                value={username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 focus:ring-blue-300 focus:border-blue-300 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600"
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 focus:ring-blue-300 focus:border-blue-300 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600"
              />
            </label>
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => PostSignUpInfo({ username: username, password: password })}
              className="btn-primary"
            >
              Sign Up
            </button>
            <button
              onClick={() => console.log(false)}
              className="btn-secondary"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default SignupModal;
