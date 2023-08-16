import SearchBar from "../components/SearchBar"
import React, { useState } from 'react';
import { Link } from "react-router-dom";


const Search = () => {
  const [musicList, setMusicList] = useState([]);

  const getResult = (result) => {
      setMusicList(result)
  }
  return (
    <div>
      <SearchBar getResult={getResult}/>
        <div className="container-search">
          <div className="music-grid-search">
            {musicList.map((music, index) => (
              <div key={music.id} className="music-item-search">
                <Link to={`/music/${music.id}`} className="text-decoration-non">                
                  <img src={`${import.meta.env.VITE_BACKEND_URL}/img/${music.imgUri}`} alt={music.title} className="music-image-search" />
                  <h2 className="music-title-search">{music.title}</h2>
                  <h3 className="music-author-search">{music.artist}</h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}

export default Search