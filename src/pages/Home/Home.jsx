import './Home.css'
import NavBar from '../../components/NavBar/Navbar'
import Hero from '../../components/Hero/Hero'
import TitleCards from '../../components/TitleCards/TitleCards'
import Footer from '../../components/Footer/Footer'
import { useList } from '../../context/ListContext'
import { hasToken } from '../../tmdb'

const Home = () => {
  const { items } = useList()

  return (
    <div className='home'>
      <NavBar />
      {!hasToken && (
        <div className='notice'>
          Movie data is unavailable: add your TMDB token as <code>VITE_TMDB_TOKEN</code> in a <code>.env</code> file
          (see <code>.env.example</code>) and restart the dev server.
        </div>
      )}
      <Hero />
      <div className='more-cards'>
        {items.length > 0 && <TitleCards title='My List' movies={items} id='my-list' />}
        <TitleCards title='Trending This Week' path='/trending/movie/week?language=en-US' id='trending' />
        <TitleCards title='Blockbuster Movies' category='top_rated' id='blockbuster' />
        <TitleCards title='Only on Auxa Studios' category='popular' id='popular' />
        <TitleCards title='Upcoming' category='upcoming' id='upcoming' />
        <TitleCards title='Top Picks for You' category='now_playing' id='picks' />
      </div>
      <Footer />
    </div>
  )
}

export default Home
