/** @jsx jsx */

import * as React from 'react'
// 🐨 you're going to need this:
import * as auth from 'auth-provider'
import {client} from 'utils/api-client.exercise'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'

function App() {
  // 🐨 useState for the user
  const [user, setUser] = React.useState()

  React.useEffect(() => {
    auth.getToken().then(token => {
      if (token) {
        // we're logged in! Let's go get the user's data:
        client('me', {token}).then(data => {
          setUser(data.user)
        })
      }
    })
  }, [])

  // 🐨 create a login and register function
  const login = form => auth.login(form).then(u => setUser(u))
  const register = form => auth.register(form).then(u => setUser(u))
  const logout = () => auth.logout().then(() => setUser(null))

  return user ? (
    <AuthenticatedApp user={user} logout={logout} />
  ) : (
    <UnauthenticatedApp login={login} register={register} />
  )
}

export {App}

/*
eslint
  no-unused-vars: "off",
*/
