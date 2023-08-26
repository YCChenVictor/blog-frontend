import React, { useState, useEffect } from 'react'
import SignUpLogin from './SignUpLogin'

const UserInNav = (loggedIn) => {
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
