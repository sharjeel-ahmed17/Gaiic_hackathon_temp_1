
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'
import React from 'react'

const Login = () => {
  return (
    <div>
        <h1>login</h1>

        <SignedOut>
            <SignInButton/>
        </SignedOut>

        <SignedIn>
            <UserButton />
          </SignedIn>
    </div>
  )
}

export default Login