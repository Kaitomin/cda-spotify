import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PlaylistService from '../service/PlaylistService';

const MyPlaylist = () => {
    const [playlists, setPlaylists] = useState([]);
    
    useEffect(() => {
      PlaylistService.getPlaylistByUserId(1)
        .then(res => {
          setPlaylists(res.data)
        })
    }, []);

  return (
    <div className="my-playlist px-3">
      <h1>Playlists</h1>
      <div className="playlist-container mb-5">
        {playlists.map((playlist) => ( 
          <Link to={`/playlist/${playlist.id}`} key={playlist.id} className="playlist-item">
            {<img 
                src={playlist.musics.length > 0 ? 
                  `${import.meta.env.VITE_RESOURCE_IMG_URL}/${playlist.musics[0].imgUri}` :
                  "https://placehold.co/400x350"} 
                alt={playlist.title} 
                className="playlist-image" 
            />}
            <h2 className="playlist-title">{playlist.name}</h2>
          </Link>
        ))}
      </div>
      <Link to="/"><i className="fa-solid fa-circle-plus me-2"></i>Créer une playlist</Link>  
    </div>

  )
}

export default MyPlaylist