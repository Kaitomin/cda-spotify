import { useState, useEffect } from "react"
import PropTypes from 'prop-types'

import PlaylistService from "../service/PlaylistService"
import useAuth from "../hook/useAuth"
import ModalMessage from "./ModalMessage"
import "../style.css"
import MusicPlayerControls from "./MusicPlayerControls"

const MusicPlayer = ({
  selectedMusicsList,
  selectedMusic,
  selectedIndex,
  updateSelectedMusic,
}) => {
  const [currentIndex, setCurrentIndex] = useState()
  const [currentMusic, setCurrentMusic] = useState()
  const [musicList, setMusicList] = useState()
  const [playlists, setPlaylists] = useState([])
  
  // useReducer
  const [actionModalMsg, setActionModalMsg] = useState()
  const [isFavorite, setIsFavorite] = useState()
  const [showPlaylistModal, setShowPlaylistModal] = useState(false)
  const [showActionsModal, setShowActionsModal] = useState(false)

  const { currentUser, checkCookie } = useAuth()
  const isAuthenticated = localStorage.getItem("isAuthenticated")
  
  // Check for current connected user
  useEffect(() => {
    if (!isAuthenticated) return

    checkCookie(["CLIENT", "ADMIN"])
  }, [])

  // Set musics list and current music
  useEffect(() => {
    setMusicList(selectedMusicsList)
    setCurrentMusic(selectedMusic)
    setCurrentIndex(selectedIndex ? selectedIndex : 0)

    if (!currentUser.id) return

    // if user is logged in, get all his playlists
    PlaylistService.getPlaylistByUserId(currentUser.id).then((res) =>
      setPlaylists(res.data)
    )
  }, [selectedMusic, selectedMusicsList])

  // Check if current music is in user's Favoris
  useEffect(() => {
    if (playlists.length == 0 || currentMusic == null) return

    const filteredMusic = playlists[0].musics.filter(
      (m) => m.id == currentMusic.id
    )

    if (filteredMusic.length != 0) {
      setIsFavorite(true)
    } else {
      setIsFavorite(false)
    }
  }, [playlists, currentMusic])

  const handlePrevious = (isRandom) => {
    if (isRandom) {
      let newRandomIndex = Math.floor(Math.random() * musicList.length)
      while (newRandomIndex === currentIndex) {
        newRandomIndex = Math.floor(Math.random() * musicList.length)
      }
      setCurrentIndex(newRandomIndex)
      updateSelectedMusic(musicList[newRandomIndex], newRandomIndex)
    } else {
      const prevIndex =
        currentIndex == 0 ? musicList.length - 1 : currentIndex - 1
      setCurrentIndex(prevIndex)
      updateSelectedMusic(musicList[prevIndex], prevIndex)
    }
  }

  const handleNext = (isRandom) => {
    if (isRandom) {
      let newRandomIndex = Math.floor(Math.random() * musicList.length)
      while (newRandomIndex === currentIndex) {
        newRandomIndex = Math.floor(Math.random() * musicList.length)
      }
      setCurrentIndex(newRandomIndex)
      updateSelectedMusic(musicList[newRandomIndex], newRandomIndex)
    } else {
      const prevIndex =
        currentIndex == musicList.length - 1 ? 0 : +currentIndex + 1
      setCurrentIndex(prevIndex)
      updateSelectedMusic(musicList[prevIndex], prevIndex)
    }
  }

  const displayPlaylistsModal = () => {
    if (!currentUser.id) {
      setActionModalMsg("Veuillez vous connecter")
      setShowActionsModal(true)
      setTimeout(() => setShowActionsModal(false), 1500)
      return
    }

    setShowPlaylistModal(true)
  }

  const addToPlaylist = (id) => {
    if (!currentUser.id) {
      return
    }

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

      PlaylistService.getPlaylistByUserId(currentUser.id).then((res) =>
        setPlaylists(res.data)
      )
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
      setIsFavorite(true)
      setActionModalMsg("Ajoutée aux favoris")
      setShowActionsModal(true)
      setTimeout(() => setShowActionsModal(false), 1500)
    })
  }

  const removeToFavorite = () => {
    if (!currentUser.id) {
      return
    }
    PlaylistService.removeMusic(playlists[0].id, currentMusic.id).then(() => {
      setIsFavorite(false)
      setActionModalMsg("Retirée des favoris")
      setShowActionsModal(true)
      setTimeout(() => setShowActionsModal(false), 1500)
    })
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

  return (
    <div className="music-player text-light position-relative">
      {currentMusic && (
        <div className="mx-auto px-3 py-3">
          <div>
            <div className="d-flex justify-content-center align-items-center vh-45">
              <img
                className="img-player object-fit-cover w-100"
                src={`${import.meta.env.VITE_RESOURCE_IMG_URL}/${currentMusic.imgUri}`}
                alt={`${currentMusic.title}`}
                height={250}
                // eslint-disable-next-line react/no-unknown-property
                fetchpriority="high"
              />
            </div>
          </div>

          <div className="controls-container d-flex flex-column justify-content-around gap-3">
            <div className="mt-4">
              <h2 className="text-center fw-bold">{currentMusic.title}</h2>
              <h3 className="text-center">{currentMusic.artist}</h3>
            </div>
            
            <MusicPlayerControls currentMusic={currentMusic} handleNext={handleNext} handlePrevious={handlePrevious} />

            <div className="d-flex justify-content-between flex-wrap gap-2">
              <div className="tags d-flex flex-wrap gap-2 align-content-center">
                {currentMusic.tags.map((tag) => (
                  <span key={tag}>
                    <em>{tag}</em>
                  </span>
                ))}
              </div>

              <div className="d-flex justify-content-around actions">
                {showActionsModal && (
                  <ModalMessage message={actionModalMsg} loader={false} />
                )}
                {!isFavorite && (
                  <i
                    className="fa-regular fa-heart"
                    onClick={addToFavorite}
                  ></i>
                )}
                {isFavorite && (
                  <i
                    className="fa-solid fa-heart"
                    onClick={removeToFavorite}
                  ></i>
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
                          ({name, id}) =>
                            name != "Favoris" && (
                              <div
                                key={id}
                                onClick={() => addToPlaylist(id)}
                              >
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
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

MusicPlayer.propTypes = {
  selectedMusicsList: PropTypes.array,
  selectedMusic: PropTypes.object,
  selectedIndex: PropTypes.number,
  updateSelectedMusic: PropTypes.func
}

export default MusicPlayer
