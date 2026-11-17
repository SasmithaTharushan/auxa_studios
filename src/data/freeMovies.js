// Hand-picked classic films streamed from the Internet Archive (archive.org),
// where they are hosted as public-domain / freely distributable titles.
// Only identifiers listed here can be shown, so random uploads never appear.
export const FREE_IDS = [
  'his_girl_friday',
  'Nosferatu_most_complete_version_93_mins.',
  'DasKabinettdesDoktorCaligariTheCabinetofDrCaligari',
  'ThePhantomoftheOpera',
  'lost_world',
  'BattleshipPotemkin',
  'charlie_chaplin_film_fest',
  'house_on_haunted_hill_ipod',
  'ScarletStreet',
  'meet_john_doe',
  'TheFlyingDeuces',
  'gullivers_travels1939',
  'TheStranger_0',
  'suddenly',
  'TheGhoul',
  'FrankensteinfullMovie',
  '20000LeaguesUndertheSea',
  'little_princess',
  'my_favorite_brunette',
  'secret_weapon',
  'utopia',
  'iron_mask',
  'abraham_lincoln',
  'penny_serenade',
  'CC_1916_10_02_ThePawnshop',
  'CC_1916_09_04_TheCount',
  'CC_1916_05_15_TheFloorwalker',
  'CC_1916_12_04_TheRink',
]

export const archiveThumb = (id) => `https://archive.org/services/img/${encodeURIComponent(id)}`
export const archiveEmbed = (id) => `https://archive.org/embed/${encodeURIComponent(id)}`

let cache = null

// Loads titles, years and descriptions for the curated list (cached for the session).
export const fetchFreeMovies = () => {
  if (cache) return cache
  const params = new URLSearchParams({
    q: `identifier:(${FREE_IDS.map((id) => `"${id}"`).join(' OR ')})`,
    rows: String(FREE_IDS.length),
    output: 'json',
  })
  ;['identifier', 'title', 'year', 'description'].forEach((f) => params.append('fl[]', f))
  cache = fetch(`https://archive.org/advancedsearch.php?${params}`)
    .then((res) => {
      if (!res.ok) throw new Error(`Archive request failed: ${res.status}`)
      return res.json()
    })
    .then((json) => {
      const byId = new Map(json.response.docs.map((d) => [d.identifier, d]))
      return FREE_IDS.filter((id) => byId.has(id)).map((id) => {
        const d = byId.get(id)
        const title = Array.isArray(d.title) ? d.title[0] : d.title
        const description = Array.isArray(d.description) ? d.description.join(' ') : d.description || ''
        return {
          id,
          title: title || id,
          year: d.year ? String(d.year) : '',
          description: new DOMParser().parseFromString(description, 'text/html').body.textContent.trim(),
        }
      })
    })
    .catch((err) => {
      cache = null // allow retry
      throw err
    })
  return cache
}
