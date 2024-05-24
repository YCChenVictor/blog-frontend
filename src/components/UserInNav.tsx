import React from 'react';
import SignUpLogin from './SignUpLogin';

const UserInNav: React.FC = (loggedIn: boolean) => {
  return (
    <>
      {loggedIn ? (
        <>
          <SignUpLogin />
          {/* going to add logout */}
        </>
      ) : (
        <>
          <SignUpLogin />
        </>
      )}
    </>
  );
};

export default UserInNav;
