import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MyPlaylist = () => {
    const [playlists, setPlaylists] = useState([]);
    
    useEffect(() => {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/playlist/user/1`)
        .then(res => {
          setPlaylists(res.data)
        })
    }, []);

  return (
    <div className="my-playlist">
      <h1>Playlists</h1>
      <div className="playlist-container">
        {playlists.map((playlist) => ( 
          <Link to={`/playlist/${playlist.id}`} key={playlist.id} className="playlist-item">
            {<img src={playlist.musics.length > 0 ? `${import.meta.env.VITE_BACKEND_URL}/img/${playlist.musics[0].imgUri}` : "https://placehold.co/400x150"} alt={playlist.title} className="playlist-image" /> }
            <h2 className="playlist-title">{playlist.name}</h2>
          </Link>
        ))}
      </div>

    </div>

  )
}

export default MyPlaylist