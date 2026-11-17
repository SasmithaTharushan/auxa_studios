import { useEffect, useState } from 'react'
import { fetchFreeMovies } from '../data/freeMovies'

export default function useFreeMovies() {
  const [state, setState] = useState({ movies: [], loading: true, error: null })
  const [tick, setTick] = useState(0)

  useEffect(() => {
    let live = true
    setState((s) => ({ ...s, loading: true, error: null }))
    fetchFreeMovies()
      .then((movies) => live && setState({ movies, loading: false, error: null }))
      .catch((error) => live && setState({ movies: [], loading: false, error }))
    return () => {
      live = false
    }
  }, [tick])

  return { ...state, reload: () => setTick((t) => t + 1) }
}
