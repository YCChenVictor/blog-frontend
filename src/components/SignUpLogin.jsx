import React, { useState } from 'react';
import LoginModal from './LoginModal.jsx';
import SignUpModal from './SignUpModal.jsx';

function SignUpLogin() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const showLoginButton = true;
  const showSignupButton = true;

  return (
    <div>
      <div className="top-4 right-4 rounded-sm">
        {showLoginButton ? (
          <button
            onClick={() => {
              setLoginModalOpen(!loginModalOpen)
            }}
            className="px-4 py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:outline-none"
          >Login
          </button>
        ) : (
          null
        )}
        {showSignupButton ? (
          <button
            onClick={() => setSignUpModalOpen(!signUpModalOpen)}
            className="px-4 py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:outline-none"
            >Signup
          </button>
        ) : (
          null
        )}
      </div>
      {loginModalOpen ? (
        <LoginModal
        />
      ) : (
        null
      )}
      {signUpModalOpen ? (
        <SignUpModal
        />
      ) : (
        null
      )}
    </div>
  );
}

export default SignUpLogin;
