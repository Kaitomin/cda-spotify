import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import PropTypes from 'prop-types'

import PlaylistForm from "./PlaylistForm"
import PlaylistService from "../service/PlaylistService"
import useAuth from "../hook/useAuth"

const PlaylistContent = ({ showActions, musicIndex, isIntegrated }) => {
  const [musicList, setMusicList] = useState([])
  const [playlist, setPlaylist] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentMusicId, setCurrentMusicId] = useState(null)
  const [isToggleList, setIsToggleList] = useState(true)
  const { currentUser } = useAuth()

  const { playlistId } = useParams()

  const getPlaylist = () => {
    PlaylistService.getById(playlistId).then((response) => {
      const data = response.data
      setMusicList(data.musics)
      setPlaylist(data)
    })
  }

  useEffect(() => getPlaylist(), [])

  const handleDelete = (id) => {
    const answer = confirm("Retirer de la playlist ?")
    if (!answer) return

    PlaylistService.removeMusic(playlistId, id).then(() => getPlaylist())
  }
  const handleUpdatePlaylist = (childName) => {
    const newPlaylistData = {
      ...playlist,
      name: childName,
    }

    PlaylistService.updateName(currentUser.id, newPlaylistData).then(() => {
      setIsModalOpen(false)
      getPlaylist()
    })
  }

  const handleClick = (id) => {
    const buttons = document.querySelectorAll(".btn-container")
    const audios = document.querySelectorAll(".audio-tag")
    const currentBarContainer = document.querySelector(`.bars-${id}`)
    const allBarContainer = document.querySelectorAll(".music-bars")
    const currentBars = document.querySelectorAll(`.bars-${id} > .bar`)
    const allBars = document.querySelectorAll(".bar")

    if (isPlaying == false) {
      Array.from(buttons).map((btn) => {
        const playIcon = btn.querySelector(".fa-circle-play")
        const stopIcon = btn.querySelector(".fa-circle-stop")
        currentBars.forEach((b) => b.classList.add("animated"))
        currentBarContainer.classList.remove("hidden")

        if (btn.classList.contains(`btn-${id}`)) {
          playIcon.classList.add("hidden")
          stopIcon.classList.remove("hidden")
        } else {
          playIcon.classList.remove("hidden")
          stopIcon.classList.add("hidden")
        }
      })

      Array.from(audios).map((audio) => {
        if (audio.classList.contains(`music-${id}`)) {
          audio.play()
        } else {
          audio.pause()
          audio.currentTime = 0
        }
      })
      setCurrentMusicId(id)
      setIsPlaying(!isPlaying)
    } else {
      Array.from(buttons).map((btn) => {
        const playIcon = btn.querySelector(".fa-circle-play")
        const stopIcon = btn.querySelector(".fa-circle-stop")

        if (id == currentMusicId) {
          playIcon.classList.remove("hidden")
          stopIcon.classList.add("hidden")
          currentBars.forEach((b) => b.classList.remove("animated"))
          currentBarContainer.classList.add("hidden")
          setIsPlaying(false)
        }

        if (id != currentMusicId && btn.classList.contains(`btn-${id}`)) {
          playIcon.classList.add("hidden")
          stopIcon.classList.remove("hidden")
          allBars.forEach((b) => b.classList.remove("animated"))
          currentBars.forEach((b) => b.classList.add("animated"))
          allBarContainer.forEach((b) => b.classList.add("hidden"))
          currentBarContainer.classList.remove("hidden")
          setCurrentMusicId(id)
          setIsPlaying(true)
        } else {
          playIcon.classList.remove("hidden")
          stopIcon.classList.add("hidden")
        }
      })

      Array.from(audios).map((audio) => {
        if (audio.classList.contains(`music-${id}`) && id == currentMusicId) {
          audio.pause()
          audio.currentTime = 0
        } else if (
          audio.classList.contains(`music-${id}`) &&
          id != currentMusicId
        ) {
          audio.play()
        } else {
          audio.pause()
          audio.currentTime = 0
        }
      })
    }
  }

  const handleEnded = () => {
    const playIcon = document.querySelector(
      `.btn-${currentMusicId} > i.fa-circle-play`
    )
    const stopIcon = document.querySelector(
      `.btn-${currentMusicId} > i.fa-circle-stop`
    )
    const audio = document.querySelector(`.music-${currentMusicId}`)
    const currentBarContainer = document.querySelector(
      `.bars-${currentMusicId}`
    )
    const currentBars = document.querySelectorAll(
      `.bars-${currentMusicId} > .bar`
    )

    playIcon.classList.remove("hidden")
    stopIcon.classList.add("hidden")
    audio.pause()
    audio.currentTime = 0
    currentBarContainer.classList.add("hidden")
    currentBars.forEach((b) => b.classList.remove("animated"))
  }

  return (
    <div className="detailed-playlist">
      <div className="d-flex justify-content-center align-items-center column-gap-2" onClick={isIntegrated ? () => setIsToggleList(!isToggleList) : undefined}>
        <h1>{playlist && playlist.name}</h1>
        {isIntegrated && (
            isToggleList 
            ? <i className="fa-solid fa-angles-down"></i>
            : <i className="fa-solid fa-angles-up"></i>
          )
        }
        {playlist && playlist.name != 'Favoris' && showActions && !isModalOpen && (
          <i
            className="fa-solid fa-pen-to-square edit-btn"
            onClick={() => setIsModalOpen(true)}
          ></i>
        )}
      </div>
      {isModalOpen && (
        <div className="modal-window">
          <PlaylistForm
            playlistName={playlist.name}
            handlePlaylist={handleUpdatePlaylist}
          />
          <button onClick={() => setIsModalOpen(false)}>Annuler</button>
        </div>
      )}
      <div className={`music-list d-flex flex-column align-items-start m-auto ${isToggleList ? 'toggle-list' : ''}`}>
        {musicList.length == 0 && (
          <div className="w-100 mt-5 text-center">
            <h2>Playlist vide</h2>
            <Link to="/search">Visiter la bibliothèque de musiques</Link>
          </div>
        )}
        {musicList &&
          musicList.map(({id, title, artist, imgUri, audioUri}, index) => (
            <div
              key={id}
              className={`music-item track-${
                id
              } d-flex align-items-center justify-content-around w-100 p-2 ${
                musicIndex == index ? "active" : ""
              }`}
            >
              <div className="music-track position-relative">
                <img
                  src={`${import.meta.env.VITE_RESOURCE_IMG_URL}/${
                    imgUri
                  }`}
                  alt={title}
                  loading='lazy'
                  className="music-image object-fit-cover"
                  width={60}
                  height={60}
                />
                <audio
                  className={`music-${id} audio-tag`}
                  onEnded={handleEnded}
                >
                  <source
                    src={`${import.meta.env.VITE_RESOURCE_AUDIO_URL}/${
                      audioUri
                    }`}
                    type="audio/mp3"
                  />
                </audio>
                {showActions && (
                  <div
                    className={`btn-container btn-${id}`}
                    onClick={() => handleClick(id)}
                  >
                    <i className="fa-solid fa-circle-play"></i>
                    <i className="fa-solid fa-circle-stop hidden"></i>
                  </div>
                )}
              </div>
              <div>
                <div className="music-details">
                  <Link to={`/playlist/${playlist.id}/music/${index}`}>
                    <p className="music-title m-0">
                      {artist}- {title}
                    </p>
                  </Link>
                </div>

                {showActions && (
                  <div className={`music-bars d-flex justify-content-between align-items-end bars-${id} hidden`}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                  </div>
                )}
              </div>
              {showActions && (
                <i
                  className="fa-solid fa-xmark"
                  onClick={() => handleDelete(id)}
                ></i>
              )}
            </div>
          ))}
      </div>
    </div>
  )
}

PlaylistContent.propTypes = {
  showActions: PropTypes.bool,
  musicIndex: PropTypes.string,
  isIntegrated: PropTypes.bool
}

export default PlaylistContent
