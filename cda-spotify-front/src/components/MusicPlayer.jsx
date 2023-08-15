import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import { FaPlay, FaPause, FaForward, FaBackward  } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../style.css'

const MusicPlayer = () => {
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [currentMusic, setCurrentMusic] = useState(null);
  const [musicList, setMusicList] = useState([]);

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
  
  useEffect(() => {
    if (audioRef.current && currentMusic) audioRef.current.play()
  }, [currentMusic])

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

  const handleLoop = () => {
    audioRef.current.loop = !isLooping;
    setIsLooping(!isLooping);
  }
    
  const handleRandom = () => setIsRandom(!isRandom)

  return (
    <div>
      {currentMusic && (
        <div>
          <h2 className='text-center'>{currentMusic.title}</h2>
          <h3 className='text-center'>{currentMusic.artist}</h3>
          <div className='d-flex justify-content-center align-items-center vh-45'>
              <img className='img-player' src={`${import.meta.env.VITE_BACKEND_URL}/img/${currentMusic.imgUri}`}/>
          </div>
          <div className="d-flex justify-content-center mt-3">
              <a className="btn btn-primary me-2">favori</a>
              <a className="btn btn-primary me-2">playlist</a>
              <a className="btn btn-primary">partage</a>
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
            <button onClick={handleLoop} className={`control-btn ${isLooping ? 'active' : ''}`}>
              <FaPause /> 
            </button>
            { !musicId && 
              <button onClick={handlePrevious} className="control-btn">
                <FaBackward /> 
              </button> 
            }
            <button onClick={togglePlay} className="control-btn">
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            { !musicId && 
              <>
                <button onClick={handleNext} className="control-btn">
                  <FaForward />
                </button>
                <button onClick={handleRandom} className={`control-btn ${isRandom ? 'active' : ''}`}>
                  <FaPause /> 
                </button>
                </>
            }
          </div>
        </div>
      )}
    </div>
  )
}
export default MusicPlayer