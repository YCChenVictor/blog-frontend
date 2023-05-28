import React, { useContext, useState } from 'react';
import Modal from "react-modal";

function SignupModal(props) {
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

export default SignupModal;
