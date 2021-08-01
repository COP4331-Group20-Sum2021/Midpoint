import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import * as Location from 'expo-location'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useState()

  function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      }
    )
  }

  async function getLoc() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);
    return location
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
    const unsub = auth.onAuthStateChanged(async user => {
      setUser(user)
      if (user) {
        const loc = await getLoc()
        updateLoc(loc.coords.latitude, loc.coords.longitude, user)
      }
    })
    setLoading(false)

    return unsub
  }, [])

  const value = {
    user,
    location,
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
