// Shared TMDB helper. The read-access token comes from VITE_TMDB_TOKEN
// (set it in .env locally and in the Vercel project's Environment Variables).
const TOKEN = import.meta.env.VITE_TMDB_TOKEN

export const tmdbOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
}

export const tmdbFetch = (path) =>
  fetch(`https://api.themoviedb.org/3${path}`, tmdbOptions).then((res) => {
    if (!res.ok) throw new Error(`TMDB request failed: ${res.status}`)
    return res.json()
  })
