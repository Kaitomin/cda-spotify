import SearchBar from "../components/SearchBar"
import React, { useState } from 'react';
import { Link } from "react-router-dom";


const Search = () => {
  const [musicList, setMusicList] = useState([]);

  const getResult = result => setMusicList(result)
  
  return (
    <div className="search-page">
      <h1>Rechercher</h1>
      <SearchBar getResult={getResult}/>
      <hr />
        <div className="text-center px-3">
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