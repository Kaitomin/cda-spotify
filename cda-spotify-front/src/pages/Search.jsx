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

        <div className="container-search">
          <div className="music-grid-search">
            {musicList.map(music => (
              <div key={music.id} className="music-item-search">
                <Link to={`/music/${music.id}`}>            
                  <img src={`${import.meta.env.VITE_BACKEND_URL}/img/${music.imgUri}`} alt={music.title} className="music-image-search" width={150} height={150}/>
                  <h2 className="music-title-search" title={music.title}>{music.title}</h2>
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