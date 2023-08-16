import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import { FaPlay, FaPause, FaForward, FaBackward  } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../style.css'

const MusicPlayer = () => {
  const audioRef = useRef()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentIndex, setCurrentIndex] = useState()
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLooping, setIsLooping] = useState(false)
  const [isRandom, setIsRandom] = useState(false)
  const [currentMusic, setCurrentMusic] = useState(null)
  const [musicList, setMusicList] = useState([])
  const [playlists, setPlaylists] = useState([])
  const [playlistIdToAdd, setPlaylistIdToAdd] = useState()
  const [showModal, setShowModal] = useState(false)

  const { playlistId, musicIndex, musicId } = useParams()

  useEffect(() => {
    if (musicId) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/music/${musicId}`)
        .then(res => setCurrentMusic(res.data))
    } else {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/playlist/${playlistId}`)
        .then(res => {
          setMusicList(res.data.musics);
          setCurrentMusic(res.data.musics[musicIndex]);
          setCurrentIndex(+musicIndex)
        })
    }
  }, []);
  useEffect( () =>{
    setCurrentMusic(musicList[currentIndex])
  }, [currentIndex])
  
  // useEffect(() => {
  //   if (audioRef.current && currentMusic) {
  //   audioRef.current.play()
  //   setIsPlaying(true);
  // } 
  // }, [currentMusic])

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handlePrevious = () => {
    setCurrentIndex(prevIndex => prevIndex == 0 ? musicList.length - 1 : prevIndex - 1 )
  }
  
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    if (audioRef.current.currentTime == duration && !musicId) handleNext()
    if (audioRef.current.currentTime == duration && musicId) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0;
      if (isLooping == false) {
        setIsPlaying(false)
      }
    }
  }

  const handleLoadedMetadata = () => setDuration(audioRef.current.duration)

  const handleTimelineClick = (e) => {
    const timelineWidth = e.currentTarget.clientWidth;
    const clickPosition = e.nativeEvent.offsetX;
    const newTime = (clickPosition / timelineWidth) * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime)
  }
  
  const handleNext = () => {
    if (isRandom) {
      let newRandomIndex = Math.floor(Math.random() * musicList.length)
      while (newRandomIndex === currentIndex) {            
        newRandomIndex = Math.floor(Math.random() * musicList.length)
      }
      setCurrentIndex(newRandomIndex);
    } else {
      setCurrentIndex(prevIndex => prevIndex == musicList.length -1 ? 0 : prevIndex + 1)
    }
  }

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  const handleLoop = e => {
    if (!isLooping) e.target.classList.add("loop")
    else e.target.classList.remove("loop")

    audioRef.current.loop = !isLooping;
    setIsLooping(!isLooping);
  }
    
  const handleRandom = () => setIsRandom(!isRandom)

  const getPlaylists = () => {
    setShowModal(!showModal)
    // Get all playlists from user
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/playlist/user/1`)
      .then(res => {
        console.log(res.data)
        setPlaylists(res.data)
      })
  }

  const addToPlaylist = e => {
    e.preventDefault()

    // Check if music already exists in playlist
    const filteredMusic = playlists.filter(p => p.id == playlistIdToAdd)
    if (filteredMusic) {
      console.log("Cette musique existe déjà dans cette playlist")
      return
    }

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/playlist/${playlistIdToAdd}/addMusic`, currentMusic)
      .then(() => setShowModal(!showModal))
  }

  return (
    <div className='music-player'>
      {currentMusic && (
        <div className='mt-5 mx-auto'>
          <h2 className='text-center'>{currentMusic.title}</h2>
          <h3 className='text-center'>{currentMusic.artist}</h3>
          <div className='d-flex justify-content-center align-items-center vh-45 mt-3'>
            <img className='img-player shadow p-3 mb-3 bg-body rounded' src={`${import.meta.env.VITE_BACKEND_URL}/img/${currentMusic.imgUri}`}/>
          </div>
          <div className="d-flex justify-content-center column-gap-5 actions">
            <i className="fa-solid fa-heart"></i>
            <div>
              <i className="fa-solid fa-circle-plus" onClick={getPlaylists}></i>
              { showModal &&
                <form onSubmit={addToPlaylist}>
                <select name="selectedPlaylist" onChange={e => setPlaylistIdToAdd(e.target.value)}>
                  <option style={{display: "none"}}>Sélectionner une playlist</option>
                  {playlists && playlists.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                </select>
                <button>Add</button>
              </form>
              }
            </div>
            <i className="fa-solid fa-share"></i>
          </div>

          <audio 
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            src={`${import.meta.env.VITE_BACKEND_URL}/audio/${currentMusic.audioUri}`}
          />

          <div className="controls">
            <div className='d-flex justify-content-between w-100 timer'>
              <div>
                {formatTime(currentTime)}
              </div>
              <div>
                {formatTime(duration)}
              </div>
            </div>
            <div className="timeline" onClick={handleTimelineClick}>
              <div className="progress" style={{ width: `${(currentTime / duration) * 100}%` }}></div>
            </div>
            <i className="fa-solid fa-rotate-left mt-4" onClick={handleLoop}></i>
            { !musicId && 
              <i className="fa-solid fa-backward mt-4" onClick={handlePrevious}></i>
            }
            { isPlaying ?  (<i className="fa-solid fa-pause mt-4 active" onClick={togglePlay}></i>) : (<i className="fa-solid fa-play mt-4" onClick={togglePlay}></i>) }
            { !musicId &&
              <>
                <i className="fa-solid fa-forward mt-4"onClick={handleNext}></i>
                <i className="fa-solid fa-shuffle mt-4" onClick={handleRandom}></i>
              </>
            }
          </div>
        </div>
      )}
    </div>
  )
}
export default MusicPlayer