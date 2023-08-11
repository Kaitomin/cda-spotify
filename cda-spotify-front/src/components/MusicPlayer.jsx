//import React from 'react'
import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import { FaPlay, FaPause, FaForward, FaBackward  } from 'react-icons/fa';
import { json } from 'react-router-dom';
import '../style.css'

const MusicPlayer = ({}) => {


    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isLooping, setIsLooping] = useState(false);
    const [isRandom, setIsRandom] = useState(false);
    const [musicData, setMusicData] = useState(null)

    useEffect(() =>{
            const data = fetch('http://localhost:8080/api/music/2')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setMusicData(data)
            })

    },[])

    const togglePlay = () => {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      };
      const handlePrevious = () => {
        // precedente musique 
      };
    
      const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
      };
    
      const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
      };
      const handleTimelineClick = (e) => {
        const timelineWidth = e.currentTarget.clientWidth;
        const clickPosition = e.nativeEvent.offsetX;
        const newTime = (clickPosition / timelineWidth) * duration;
        
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
      };    
    
      const handleNext = () => {
        // prochaine musique
      };
      function formatTime(timeInSeconds) {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      }
      const handleLoop = () => {
        audioRef.current.loop = !isLooping;
        setIsLooping(!isLooping);
      };
      
      const handleRandom = () => {
        // demandé a DAI !!!
      };

  return (
    <div>
        <div>MusicPlayer</div>
        {musicData && (
        <div>
            <h2 className='text-center'>{musicData.title}</h2>
            <h3 className='text-center'>{musicData.artist}</h3>
            <div className='d-flex justify-content-center align-items-center vh-45'>
                <img className='img-player' src={`http://localhost:8080/img/${musicData.imgUri}`}/>
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
                src={`http://localhost:8080/audio/${musicData.audioUri}`}
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
                <button onClick={handlePrevious} className="control-btn">
                    <FaBackward /> {}
                </button>
                <button onClick={togglePlay} className="control-btn">
                {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <button onClick={handleNext} className="control-btn">
                <FaForward />
                </button>
                <button onClick={handleRandom} className={`control-btn ${isRandom ? 'active' : ''}`}>
                    <FaPause /> 
                </button>
            </div>




        </div>
        )}

    </div>
  )
}
export default MusicPlayer