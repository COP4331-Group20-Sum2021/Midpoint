import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

  function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      }
    )
  }


  function updateLoc(lat, lon, user) {
    if (user && user.emailVerified) {
      fetch('https://group20-midpoint.herokuapp.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.uid,
          email: user.email,
          auth: user.Aa,
          expiration: user.h.c,
          lat,
          lon
        })
      })
    }
  }

  function signup(email, firstname, lastname, password) {
    return auth.createUserWithEmailAndPassword(email, password)
      .then(async user => {
        user.user.sendEmailVerification()
        await fetch('https://group20-midpoint.herokuapp.com/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            firstname: toTitleCase(firstname),
            lastname: toTitleCase(lastname)
          })
        })
      })
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password).catch(e => {
      return -1
    })
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(user => {
      setUser(user)
      if (user) {
        // https://stackoverflow.com/questions/11747440/wait-for-callback-in-javascript
        let geoloc
        const successful = function (position) {
          geoloc = {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
          }
        }

        const getLocation = function(callback) {
          navigator.geolocation.getCurrentPosition(pos => {
            successful(pos)
            typeof callback === 'function' && callback(geoloc)
          }, null, { enableHighAccuracy: true })
        }

        getLocation(function(pos){
          updateLoc(pos.latitude, pos.longitude, user)
        })
      }
    })
    setLoading(false)

    return unsub
  }, [])

  const value = {
    user,
    signup,
    login,
    logout,
    resetPassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
