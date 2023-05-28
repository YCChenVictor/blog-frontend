import React, { useContext, useState } from 'react';
import LoginModal from './LoginModal.jsx';
import SignupModal from './SignupModal.jsx';

function SignupLogin() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signUpModalOpen, setSignupModalOpen] = useState(false);
  const LoginModalContext = React.createContext();
  const SignupModalContext = React.createContext();
  const showLoginButton = true;
  const showSignupButton = true;

  return (
    <div>
      <div className="top-4 right-4 rounded-sm">
        {showLoginButton ? (
          <button
            onClick={setLoginModalOpen}
            className="p-2"
          >Login
          </button>
        ) : (
          null
        )}
        {showSignupButton ? (
          <button
            onClick={setSignupModalOpen}
            className="p-2"
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
      <SignupModalContext.Provider value={{ signUpModalOpen, setSignupModalOpen }}>
        <SignupModal
          ariaHideApp={false}
          SignupModalOpen={signUpModalOpen}
          setSignupModalOpen={setSignupModalOpen}
          MyContext={SignupModalContext}
        />
      </SignupModalContext.Provider>
    </div>
  );
}

export default SignupLogin;
