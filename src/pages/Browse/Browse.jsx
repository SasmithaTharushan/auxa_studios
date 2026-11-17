import { useSearchParams } from 'react-router-dom'
import './Browse.css'
import NavBar from '../../components/NavBar/Navbar'
import Footer from '../../components/Footer/Footer'
import PagedGrid from '../../components/PagedGrid/PagedGrid'
import useTmdb from '../../hooks/useTmdb'

const SORTS = [
  ['popularity.desc', 'Most popular'],
  ['vote_average.desc', 'Top rated'],
  ['primary_release_date.desc', 'Newest'],
  ['revenue.desc', 'Highest grossing'],
]

const Browse = () => {
  const [params, setParams] = useSearchParams()
  const genre = params.get('genre') || ''
  const sort = params.get('sort') || 'popularity.desc'
  const { data } = useTmdb('/genre/movie/list?language=en')
  const genres = data?.genres || []

  const update = (next) => {
    const p = new URLSearchParams(params)
    Object.entries(next).forEach(([k, v]) => (v ? p.set(k, v) : p.delete(k)))
    setParams(p, { replace: true })
  }

  const title = genres.find((g) => String(g.id) === genre)?.name || 'All movies'
  const basePath = `/discover/movie?include_adult=false&language=en-US&sort_by=${sort}&vote_count.gte=${sort === 'popularity.desc' ? 0 : 200}${genre ? `&with_genres=${genre}` : ''}`

  return (
    <div className='page'>
      <NavBar />
      <main className='page-main'>
        <div className='browse-head'>
          <h1 className='page-title'>{title}</h1>
          <label className='sort-select'>
            Sort by
            <select value={sort} onChange={(e) => update({ sort: e.target.value === 'popularity.desc' ? '' : e.target.value })}>
              {SORTS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </label>
        </div>
        <div className='genre-bar' role='tablist' aria-label='Genres'>
          <button type='button' className={!genre ? 'active' : ''} onClick={() => update({ genre: '' })}>All</button>
          {genres.map((g) => (
            <button key={g.id} type='button' className={String(g.id) === genre ? 'active' : ''} onClick={() => update({ genre: String(g.id) })}>
              {g.name}
            </button>
          ))}
        </div>
        <PagedGrid key={basePath} basePath={basePath} />
      </main>
      <Footer />
    </div>
  )
}

export default Browse
