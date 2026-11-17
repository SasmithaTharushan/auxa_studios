import { createContext, useContext, useState, useCallback, useMemo } from 'react'

// Client-side demo accounts: stored in this browser only (there is no backend).
const USERS_KEY = 'auxa_users'
const SESSION_KEY = 'auxa_session'

const read = (store, key, fallback) => {
  try {
    const v = store.getItem(key)
    return v ? JSON.parse(v) : fallback
  } catch {
    return fallback
  }
}
const write = (store, key, value) => {
  try {
    store.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable */
  }
}
const clearSession = () => {
  try {
    localStorage.removeItem(SESSION_KEY)
    sessionStorage.removeItem(SESSION_KEY)
  } catch {
    /* ignore */
  }
}

const hash = async (email, password) => {
  const data = new TextEncoder().encode(`${email}:${password}`)
  const buf = await crypto.subtle.digest('SHA-256', data)
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    () => read(localStorage, SESSION_KEY, null) || read(sessionStorage, SESSION_KEY, null)
  )

  const startSession = (u, remember) => {
    clearSession()
    write(remember ? localStorage : sessionStorage, SESSION_KEY, u)
    setUser(u)
  }

  const signUp = useCallback(async ({ name, email, password, remember }) => {
    const key = email.trim().toLowerCase()
    const users = read(localStorage, USERS_KEY, {})
    if (users[key]) throw new Error('An account with this email already exists. Try signing in.')
    users[key] = { name: name.trim(), hash: await hash(key, password) }
    write(localStorage, USERS_KEY, users)
    startSession({ name: users[key].name, email: key }, remember)
  }, [])

  const signIn = useCallback(async ({ email, password, remember }) => {
    const key = email.trim().toLowerCase()
    const account = read(localStorage, USERS_KEY, {})[key]
    if (!account || account.hash !== (await hash(key, password))) {
      throw new Error('Incorrect email or password.')
    }
    startSession({ name: account.name, email: key }, remember)
  }, [])

  const guest = useCallback(() => startSession({ name: 'Guest', email: 'guest@auxa.local' }, false), [])

  const signOut = useCallback(() => {
    clearSession()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, signUp, signIn, guest, signOut }),
    [user, signUp, signIn, guest, signOut]
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)
