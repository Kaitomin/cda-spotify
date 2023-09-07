import { useState } from "react"
import PropTypes from 'prop-types'

import PlaylistService from "../service/PlaylistService"
import ModalMessage from "./ModalMessage"

const MusicPlayerActions = ({ 
    isFavorite,
    currentMusic,
    currentUser, 
    playlists, 
    handleAddToFavorite, 
    handleRemoveToFavorite, 
    handleAddToPlaylist
  }) => {
  const [actionModalMsg, setActionModalMsg] = useState()
  const [showPlaylistModal, setShowPlaylistModal] = useState(false)
  const [showActionsModal, setShowActionsModal] = useState(false)
  
  const displayPlaylistsModal = () => {
    if (!currentUser.id) {
      setActionModalMsg("Veuillez vous connecter")
      setShowActionsModal(true)
      setTimeout(() => setShowActionsModal(false), 1500)
      return
    }

    setShowPlaylistModal(true)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(location.href)
      setActionModalMsg("Lien copié dans le presse-papiers")
      setShowActionsModal(true)
      setTimeout(() => setShowActionsModal(false), 1500)
    } catch (e) {
      console.log(e)
    }
  }

  const addToPlaylist = (id) => {
    if (!currentUser.id) return

    // Check if music already exists in playlist
    const filteredMusic = playlists
      .filter((p) => p.id == id)[0]
      .musics.filter((m) => m.id == currentMusic.id)

    if (filteredMusic.length != 0) {
      setActionModalMsg("Cette musique est déjà dans cette playlist")
      setShowActionsModal(true)
      setTimeout(() => setShowActionsModal(false), 1500)
      setShowPlaylistModal(!showPlaylistModal)
      return
    }

    PlaylistService.addMusic(id, currentMusic).then(() => {
      setActionModalMsg("Ajoutée à la playlist")
      setShowActionsModal(true)
      setTimeout(() => setShowActionsModal(false), 1500)
      setShowPlaylistModal(!showPlaylistModal)
      handleAddToPlaylist()
    })
  }

  const addToFavorite = () => {
    if (!currentUser.id) {
      setActionModalMsg("Veuillez vous connecter")
      setShowActionsModal(true)
      setTimeout(() => setShowActionsModal(false), 1500)
      return
    }

    PlaylistService.addMusic(playlists[0].id, currentMusic).then(() => {
      setActionModalMsg("Ajoutée aux favoris")
      setShowActionsModal(true)
      handleAddToFavorite()
      setTimeout(() => setShowActionsModal(false), 1500)
    })
  }

  const removeToFavorite = () => {
    if (!currentUser.id) {
      return
    }
    PlaylistService.removeMusic(playlists[0].id, currentMusic.id).then(() => {
      setActionModalMsg("Retirée des favoris")
      setShowActionsModal(true)
      handleRemoveToFavorite(false)
      setTimeout(() => setShowActionsModal(false), 1500)
    })
  }

  return (
    <div className="d-flex justify-content-around actions">
      {showActionsModal && (
        <ModalMessage message={actionModalMsg} loader={false} />
      )}
      {!isFavorite && (
        <i className="fa-regular fa-heart" onClick={addToFavorite}></i>
      )}
      {isFavorite && (
        <i className="fa-solid fa-heart" onClick={removeToFavorite}></i>
      )}

      <div>
        <i
          className="fa-solid fa-circle-plus"
          onClick={displayPlaylistsModal}
        ></i>
        {showPlaylistModal && (
          <div className="playlist-modal">
            <p>Ajouter à ...</p>
            {playlists &&
              playlists.map(
                ({ name, id }) =>
                  name != "Favoris" && (
                    <div key={id} onClick={() => addToPlaylist(id)}>
                      {name}
                    </div>
                  )
              )}
            <i
              className="fa-solid fa-circle-xmark"
              onClick={() => setShowPlaylistModal(false)}
            ></i>
          </div>
        )}
      </div>
      <i className="fa-solid fa-share" onClick={copyToClipboard}></i>
    </div>
  )
}

MusicPlayerActions.propTypes = {
  isFavorite: PropTypes.bool,
  currentMusic: PropTypes.object,
  currentUser: PropTypes.object,
  playlists: PropTypes.array,
  handleAddToFavorite: PropTypes.func,
  handleRemoveToFavorite: PropTypes.func,
  handleAddToPlaylist: PropTypes.func
}

export default MusicPlayerActions
