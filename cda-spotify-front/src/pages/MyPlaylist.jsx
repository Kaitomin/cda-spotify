import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PlaylistService from '../service/PlaylistService';
import UserService from '../service/UserService';
import PlaylistForm from '../components/PlaylistForm';
import useAuth from '../hook/useAuth'
import { useNavigate } from 'react-router-dom'

const MyPlaylist = () => {
  const [playlists, setPlaylists] = useState([])
  const [showModal, setShowModal] = useState(false)
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const getPlaylists = () => {
    PlaylistService.getPlaylistByUserId(currentUser.id, currentUser.token)
      .then(res => {
        setPlaylists(res.data)
      })
      .catch(() => navigate('/login'))
  }
  
  useEffect(() => {
    getPlaylists()
  }, []);

  const addNewPlaylistToUser = newPlaylistName => {
    UserService.addPlaylist(currentUser.id, { name: newPlaylistName }, currentUser.token)
      .then(() => getPlaylists())
  }

  const removePlaylistFromUser = playlistId => {
    //if (!confirm("Supprimer cette playlist ?")) return

    UserService.deletePlaylist(currentUser.id, playlistId, currentUser.token)
      .then(() => getPlaylists())
  }

  return (
    <div className="my-playlist px-3">
      <h1>Playlists</h1>
      <div className="playlist-container mb-5">
        { playlists.map((playlist) => (
          <div key={playlist.id} className="playlist-item">
            <img 
              src={playlist.musics.length > 0 ? 
                `${import.meta.env.VITE_RESOURCE_IMG_URL}/${playlist.musics[0].imgUri}` :
                "https://placehold.co/400x350"} 
                alt={playlist.title} 
                className="playlist-image" 
              />
            <Link to={`/playlist/${playlist.id}`}>
              <h2 className="playlist-title">{playlist.name}</h2>
            </Link>
            <i className="fa-solid fa-xmark" onClick={() => removePlaylistFromUser(playlist.id)}></i>
          </div>
          
        ))}
      </div>
      <p>
        <i className="fa-solid fa-circle-plus me-2" onClick={() => setShowModal(true)}></i>
        Créer une playlist
      </p>
      {showModal && (
        <div className='modal-window'>
          <PlaylistForm handlePlaylist={addNewPlaylistToUser} />
          <button onClick={() => setShowModal(false)}>Annuler</button>
        </div>
      )} 
    </div>

  )
}

export default MyPlaylist