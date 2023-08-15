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
    <div className="MyPlayslist-body">

      <h1 className='text-center pt-5'>Playlists</h1>
      <div className="playlist-container">
        {playlists.map((playlist) => (
             playlist.musics.length > 0 && 
            <Link to={`/playlist/${playlist.id}`} key={playlist.id} className="playlist-item">
              { <img src={`${import.meta.env.VITE_BACKEND_URL}/img/${playlist.musics[0].imgUri}`} alt={playlist.title} className="playlist-image" /> }
              <p className="playlist-title">{playlist.name}</p>
            </Link>
        ))}
      </div>

    </div>

  )
}

export default MyPlaylist