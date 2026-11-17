import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { useAuth } from './AuthContext'

// "My List" is saved per user in localStorage.
const ListContext = createContext(null)

const load = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || []
  } catch {
    return []
  }
}

export const ListProvider = ({ children }) => {
  const { user } = useAuth()
  const key = `auxa_list_${user?.email || 'none'}`
  const [state, setState] = useState({ key, items: load(key) })

  // Reload when the signed-in user changes
  useEffect(() => {
    setState((s) => (s.key === key ? s : { key, items: load(key) }))
  }, [key])

  const items = state.key === key ? state.items : load(key)

  const save = useCallback(
    (next) => {
      setState({ key, items: next })
      try {
        localStorage.setItem(key, JSON.stringify(next))
      } catch {
        /* ignore */
      }
    },
    [key]
  )

  const has = useCallback((id) => items.some((m) => m.id === id), [items])

  const toggle = useCallback(
    (movie) => {
      if (items.some((m) => m.id === movie.id)) {
        save(items.filter((m) => m.id !== movie.id))
      } else {
        const { id, title, original_title, poster_path, backdrop_path, vote_average, release_date } = movie
        save([{ id, title: title || original_title, poster_path, backdrop_path, vote_average, release_date }, ...items])
      }
    },
    [items, save]
  )

  const value = useMemo(() => ({ items, has, toggle }), [items, has, toggle])
  return <ListContext.Provider value={value}>{children}</ListContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useList = () => useContext(ListContext)
