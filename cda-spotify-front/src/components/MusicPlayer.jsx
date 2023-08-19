import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import '../style.css'
import MusicService from '../service/MusicService';
import PlaylistService from '../service/PlaylistService';

const MusicPlayer = ({ playlistId, musicIndex, musicId }) => {
  const audioRef = useRef()
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentIndex, setCurrentIndex] = useState()
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLooping, setIsLooping] = useState(false)
  const [isRandom, setIsRandom] = useState(false)
  const [currentMusic, setCurrentMusic] = useState(null)
  const [musicList, setMusicList] = useState([])
  const [playlists, setPlaylists] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [isFavorite, setIsFavorite] = useState()

  useEffect(() => {
    // Accessing from music page
    if (musicId) {
      MusicService.getById(musicId)
        .then(res => setCurrentMusic(res.data))
      MusicService.getAll()
        .then(res => {
          setMusicList(res.data)
          const indexOfCurrentMusic = res.data.findIndex(m => m.id == musicId)
          setCurrentIndex(indexOfCurrentMusic)
          setCurrentMusic(res.data[indexOfCurrentMusic])
        })
    // Accessing from a specific playlist
    } else {
      PlaylistService.getById(playlistId)
        .then(res => {
          setMusicList(res.data.musics)
          setCurrentMusic(res.data.musics[musicIndex])
          setCurrentIndex(+musicIndex)
        })
    }

    // TODO: add user auth verification
    PlaylistService.getPlaylistByUserId(1)
      .then(res => setPlaylists(res.data))
  }, []);

  useEffect(() => {
    setCurrentMusic(musicList[currentIndex])
  }, [currentIndex])

  useEffect(() => {
    if (isPlaying && audioRef.current && currentMusic) {
      audioRef.current.play()
    }
  }, [currentMusic])

  useEffect(() => {
    if (playlists.length == 0) return

    const filteredMusic = playlists[0].musics.filter(m => m.id == currentMusic.id)

    if (filteredMusic.length != 0) {
      console.log("Cette musique est déjà en favoris")
      setIsFavorite(true)
    } else {
      console.log("Non en favoris")
      setIsFavorite(false)
    }
  }, [playlists])

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
    if (Math.ceil(audioRef.current.currentTime) >= duration) handleNext()
  }

  const handleLoadedMetadata = () => {
    const splitted = currentMusic.duration.split(":")
    setDuration(parseInt(splitted[0]) * 60 + parseInt(splitted[1]))
  }

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
    if (!isLooping) e.target.classList.add("loop", "active")
    else e.target.classList.remove("loop", "active")

    audioRef.current.loop = !isLooping;
    setIsLooping(!isLooping);
  }
    
  const handleRandom = e => {
    if (!isRandom) e.target.classList.add("active")
    else e.target.classList.remove("active")
    setIsRandom(!isRandom)
  }

  const addToPlaylist = id => {
    // Check if music already exists in playlist
    const filteredMusic = playlists.filter(p => p.id == id)[0].musics.filter(m => m.id == currentMusic.id)
    if (filteredMusic.length != 0) {
      console.log("Cette musique existe déjà dans cette playlist")
      return
    }

    PlaylistService.addMusic(id, currentMusic)
      .then(() => {
        console.log("Musique ajoutée à la playlist")
        setShowModal(!showModal)
      })
  }

  const addToFavorite = () => {
    PlaylistService.addMusic(playlists[0].id, currentMusic)
      .then(() => {
        console.log("Ajoutée aux favoris")
        setIsFavorite(true)
      })
  }

  const removeToFavorite = () => {
    PlaylistService.removeMusic(playlists[0].id, currentMusic.id)
      .then(() => {
        console.log("Retirée des favoris")
        setIsFavorite(false)
      })
  }

  return (
    <div className='music-player'>
      {currentMusic && (
        <div className='mx-auto px-3 py-5'>
          <div className='d-flex justify-content-center align-items-center vh-45 mt-3'>
            <img className='img-player shadow bg-body rounded-top w-100 object-fit-cover' src={`${import.meta.env.VITE_RESOURCE_IMG_URL}/${currentMusic.imgUri}`} height={350} />
          </div>
          
          <div className="d-flex justify-content-around py-2 rounded-bottom actions">
            { !isFavorite && <i className="fa-regular fa-heart" onClick={addToFavorite}></i> }
            { isFavorite && <i className="fa-solid fa-heart" onClick={removeToFavorite}></i> }
            
            <div>
              <i className="fa-solid fa-circle-plus" onClick={() => setShowModal(true)}></i>
              { showModal &&
                <div className='playlist-modal'>
                    <p>Ajouter à ...</p>
                    { playlists && playlists.map(p => (
                      <div key={p.id} onClick={() => addToPlaylist(p.id)}>{p.name}</div>
                    ))}
                    <div onClick={() => setShowModal(false)}>
                      <i className="fa-solid fa-circle-xmark"></i>
                    </div>
                </div>
              }
            </div>
            <i className="fa-solid fa-share"></i>
          </div>

          <div className='mt-4'>
            <h2 className='text-center fw-bold'>{currentMusic.title}</h2>
            <h3 className='text-center'>{currentMusic.artist}</h3>
          </div>
          <audio 
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            src={`${import.meta.env.VITE_RESOURCE_AUDIO_URL}/${currentMusic.audioUri}`}
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
            {/* { !musicId &&  */}
              <i className="fa-solid fa-backward mt-4" onClick={handlePrevious}></i>
            {/* } */}
            { isPlaying ?  (<i className="fa-solid fa-pause mt-4 active" onClick={togglePlay}></i>) : (<i className="fa-solid fa-play mt-4" onClick={togglePlay}></i>) }
            {/* { !musicId && */}
              <>
                <i className="fa-solid fa-forward mt-4"onClick={handleNext}></i>
                <i className="fa-solid fa-shuffle mt-4" onClick={handleRandom}></i>
              </>
            {/* } */}
          </div>
        </div>
      )}
    </div>
  )
}
export default MusicPlayer