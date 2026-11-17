import { useEffect, useState } from 'react'
import { tmdbFetch } from '../tmdb'

// Fetches a TMDB path. Pass a falsy path to skip. Returns { data, loading, error, reload }.
export default function useTmdb(path) {
  const [state, setState] = useState({ data: null, loading: Boolean(path), error: null })
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (!path) return
    const controller = new AbortController()
    setState((s) => ({ ...s, loading: true, error: null }))
    tmdbFetch(path, controller.signal)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((error) => {
        if (error.name !== 'AbortError') setState({ data: null, loading: false, error })
      })
    return () => controller.abort()
  }, [path, tick])

  return { ...state, reload: () => setTick((t) => t + 1) }
}
