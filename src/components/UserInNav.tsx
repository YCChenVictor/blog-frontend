import React, { useState, useEffect } from 'react'
import SignUpLogin from './SignUpLogin.jsx'

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
  )
}

export default UserInNav
