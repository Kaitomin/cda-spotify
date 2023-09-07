import { useState, useEffect } from "react"
import PropTypes from 'prop-types'

import PlaylistService from "../service/PlaylistService"
import useAuth from "../hook/useAuth"
import MusicPlayerControls from "./MusicPlayerControls"
import MusicPlayerActions from "./MusicPlayerActions"
import "../style.css"

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
  const [isFavorite, setIsFavorite] = useState()
  
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

  const addToPlaylist = () => {
    PlaylistService.getPlaylistByUserId(currentUser.id)
      .then((res) => setPlaylists(res.data))
  }

  const addToFavorite = () => setIsFavorite(true)

  const removeToFavorite = () => setIsFavorite(false)

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
            
            <MusicPlayerControls 
              currentMusic={currentMusic} 
              handleNext={handleNext} 
              handlePrevious={handlePrevious}
            />

            <div className="d-flex justify-content-between flex-wrap gap-2">
              <div className="tags d-flex flex-wrap gap-2 align-content-center">
                {currentMusic.tags.map((tag) => (
                  <span key={tag}>
                    <em>{tag}</em>
                  </span>
                ))}
              </div>

              <MusicPlayerActions 
                isFavorite={isFavorite}
                currentMusic={currentMusic}
                currentUser={currentUser}
                playlists={playlists} 
                handleAddToFavorite={addToFavorite} 
                handleRemoveToFavorite={removeToFavorite} 
                handleAddToPlaylist={addToPlaylist}
              />

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
