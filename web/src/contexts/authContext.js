import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        user.user.sendEmailVerification()
      })
  }

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(user => setUser(user))
    setLoading(false)

    return unsub
  }, [])

  const value = {
    user,
    signup
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
