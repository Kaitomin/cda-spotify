import SearchBar from "../components/SearchBar"
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import MusicService from "../service/MusicService";



const Search = () => {
  const [musicList, setMusicList] = useState([]);
  const [checkedFilters, setCheckedFilters] = useState([])
  const [refresh, setRefresh] = useState(false);

  useEffect(() => setRefresh(!refresh), [checkedFilters])

  const getResult = searchKey => {
    if ((checkedFilters.includes('title') && checkedFilters.includes('artist')) || (!checkedFilters.includes('title') && !checkedFilters.includes('artist'))) {
      MusicService.searchBy(searchKey)
        .then(res => setMusicList(res.data))
    } else if (checkedFilters.includes('title')) {
      MusicService.searchByTitle(searchKey)
        .then(res => setMusicList(res.data))
    } else {
      MusicService.searchByArtist(searchKey)
        .then(res => setMusicList(res.data))
    }
  }

  const handleFilter = e => {
    if (e.target.checked) {
      setCheckedFilters([...checkedFilters, e.target.value])
    } else {
      const filtered = checkedFilters.filter(el => el != e.target.value)
      setCheckedFilters(filtered)
    }
  }

  return (
    <div className="search-page px-3 mt-4">
      <SearchBar getResult={getResult} refresh={refresh} />
      <div className="d-flex justify-content-evenly my-2">
        <div className="position-relative">
          <label htmlFor="title" className="toggle">Par titre</label>
          <input type="checkbox" id="title" name="title" value="title" className="toggle__input" onChange={handleFilter} />
          <span className="toggle-track">
				    <span className="toggle-indicator"></span>
          </span>
        </div>
        <div className="position-relative">
          <label htmlFor="artist" className="toggle">Par artiste</label>
          <input type="checkbox" id="artist" name="artist" value="artist" className="toggle__input" onChange={handleFilter} />
          <span className="toggle-track">
				    <span className="toggle-indicator"></span>
          </span>
        </div>
      </div>
      <hr />
      <div className="text-center">
        { musicList.length > 0 &&<h2 className="mb-3">{musicList.length == 1 ? 'Résultat' : 'Résultats'} ({musicList.length})</h2> }
        <div className="result-grid">
          {musicList.map(music => (
            <div key={music.id} className="music-item-search bg-white rounded">
              <Link to={`/music/${music.id}`} className="text-decoration-none">            
                <img src={`${import.meta.env.VITE_BACKEND_URL}/img/${music.imgUri}`} alt={music.title} className="music-image-search rounded-top object-fit-cover" width={100 + '%'} height={185 + 'px'} />
                <h2 className="music-title-search fw-bold mt-2" title={music.title}>{music.title}</h2>
                <h3 className="music-author-search" title={music.artist}>{music.artist}</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Search