// Shared TMDB helper. The read-access token comes from VITE_TMDB_TOKEN
// (set it in .env locally and in the Vercel project's Environment Variables).
const TOKEN = import.meta.env.VITE_TMDB_TOKEN

export const hasToken = Boolean(TOKEN)

export const tmdbFetch = (path, signal) =>
  fetch(`https://api.themoviedb.org/3${path}`, {
    method: 'GET',
    signal,
    headers: { accept: 'application/json', Authorization: `Bearer ${TOKEN}` },
  }).then((res) => {
    if (!res.ok) throw new Error(`TMDB request failed: ${res.status}`)
    return res.json()
  })

export const img = (path, size = 'w500') =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : null

export const year = (date) => (date ? date.slice(0, 4) : '')
export const runtimeText = (min) => (min ? `${Math.floor(min / 60)}h ${min % 60}m` : '')
