import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

  function updateLoc() {
    const data = {}
    const dbRequest = window.indexedDB.open('firebaseLocalStorageDb')
    dbRequest.onsuccess = ev => {
      const db = ev.target.result
      const tx = db.transaction('firebaseLocalStorage', 'readonly')
      const store = tx.objectStore('firebaseLocalStorage')
      const getReq = store.getAll()
  
      getReq.onsuccess = async ev => {
        const target = ev.target.result[0].value
        data['email'] = target.email
        data['userId'] = target.uid
        data['auth'] = target.stsTokenManager.accessToken
        data['expiration'] = target.stsTokenManager.expirationTime
        
        navigator.geolocation.getCurrentPosition(pos => {
          data['lat'] = pos.coords.latitude
          data['lon'] = pos.coords.longitude
        })

        // send login update request
        await fetch('https://group20-midpoint.herokuapp.com/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        })
      }
    }
  }

  function signup(email, firstName, lastName, password) {
    // send request to signup api

    return auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        user.user.sendEmailVerification()
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
        updateLoc()
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
