import React, { useState, useRef, Children } from "react"
import { useEffect } from "react"
import PlaylistService from "../service/PlaylistService"
import useAuth from "../hook/useAuth"
import ModalMessage from "./ModalMessage"
import "../style.css"

const MusicPlayer = ({
  selectedMusicsList,
  selectedMusic,
  selectedIndex,
  updateSelectedMusic,
}) => {
  const audioRef = useRef()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentIndex, setCurrentIndex] = useState()
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLooping, setIsLooping] = useState(false)
  const [isRandom, setIsRandom] = useState(false)
  const [currentMusic, setCurrentMusic] = useState()
  const [musicList, setMusicList] = useState()
  const [playlists, setPlaylists] = useState([])
  const [showPlaylistModal, setShowPlaylistModal] = useState(false)
  const [showActionsModal, setShowActionsModal] = useState(false)
  const [isFavorite, setIsFavorite] = useState()
  const [actionModalMsg, setActionModalMsg] = useState()
  const isAuthenticated = localStorage.getItem("isAuthenticated")
  const { currentUser, checkCookie } = useAuth()

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

    // if user is logged in, get all his playlists
    if (!currentUser.id) return

    PlaylistService.getPlaylistByUserId(currentUser.id).then((res) =>
      setPlaylists(res.data)
    )
  }, [selectedMusic, selectedMusicsList])

  // Autoplay audio
  useEffect(() => {
    if (audioRef.current && currentMusic) {
      audioRef.current.play()
      setIsPlaying(!audioRef.current.paused)
    }
  }, [currentMusic])

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

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handlePrevious = () => {
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

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime)
  }

  const handleLoadedMetadata = () => {
    const splitted = currentMusic.duration.split(":")
    setDuration(parseInt(splitted[0]) * 60 + parseInt(splitted[1]))
  }

  const handleEnd = () => {
    // Reset duration back to 0
    if (!isLooping && !isRandom) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
    } else if (!isLooping) handleNext()

    return
  }

  const handleTimelineClick = (e) => {
    const timelineWidth = e.currentTarget.clientWidth
    const clickPosition = e.nativeEvent.offsetX
    const newTime = (clickPosition / timelineWidth) * duration

    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleNext = () => {
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

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const handleLoop = () => {
    if (!isLooping) setIsRandom(false)

    audioRef.current.loop = !isLooping
    setIsLooping(!isLooping)
  }

  const handleRandom = (e) => {
    if (!isRandom) setIsLooping(false)

    setIsRandom(!isRandom)
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
      return
    }

    PlaylistService.addMusic(id, currentMusic).then(() => {
      console.log("Musique ajoutée à la playlist")
      setShowPlaylistModal(!showPlaylistModal)
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
    })
  }

  const removeToFavorite = () => {
    if (!currentUser.id) {
      return
    }
    PlaylistService.removeMusic(playlists[0].id, currentMusic.id).then(() => {
      setIsFavorite(false)
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
                className="img-player bg-body object-fit-cover w-100"
                src={`${import.meta.env.VITE_RESOURCE_IMG_URL}/${currentMusic.imgUri}`}
                height={250}
              />
            </div>
          </div>

          <div className="controls-container d-flex flex-column justify-content-around gap-3">
            <div className="mt-4">
              <h2 className="text-center fw-bold">{currentMusic.title}</h2>
              <h3 className="text-center">{currentMusic.artist}</h3>
            </div>
            <audio
              ref={audioRef}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleEnd}
              src={`${import.meta.env.VITE_RESOURCE_AUDIO_URL}/${currentMusic.audioUri}`}
            />

            <div className="controls d-flex align-items-center flex-wrap justify-content-around">
              <div className="d-flex justify-content-between w-100 timer">
                <div>{formatTime(currentTime)}</div>
                <div>{formatTime(duration)}</div>
              </div>
              <div
                className="timeline w-100 bg-white position-relative"
                onClick={handleTimelineClick}
              >
                <div
                  className="progress position-absolute top-0 start-0"
                  style={{
                    width: `${(currentTime / duration) * 100}%`,
                  }}
                ></div>
              </div>
              <i
                className={`fa-solid fa-rotate-left mt-4 ${isLooping ? "loop active" : ""}`}
                onClick={handleLoop}
              ></i>
              <i
                className="fa-solid fa-backward mt-4"
                onClick={handlePrevious}
              ></i>
              {isPlaying ? (
                <i
                  className="fa-solid fa-pause mt-4 active"
                  onClick={togglePlay}
                ></i>
              ) : (
                <i className="fa-solid fa-play mt-4" onClick={togglePlay}></i>
              )}
              <>
                <i
                  className="fa-solid fa-forward mt-4"
                  onClick={handleNext}
                ></i>
                <i
                  className={`fa-solid fa-shuffle mt-4 ${isRandom ? "active" : ""}`}
                  onClick={handleRandom}
                ></i>
              </>
            </div>

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
                          (p) =>
                            p.name != "Favoris" && (
                              <div
                                key={p.id}
                                onClick={() => addToPlaylist(p.id)}
                              >
                                {p.name}
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
export default MusicPlayer
