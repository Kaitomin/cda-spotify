import { useState, useRef, useEffect } from "react"
import PropTypes from 'prop-types'

const MusicPlayerControls = ({ currentMusic, handlePrevious, handleNext }) => {
  const audioRef = useRef()

  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLooping, setIsLooping] = useState(false)
  const [isRandom, setIsRandom] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  // Autoplay audio
  useEffect(() => {
    if (audioRef.current && currentMusic) {
      audioRef.current.play()
      setIsPlaying(!audioRef.current.paused)
    }
  }, [currentMusic])

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
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

  const handleLoop = () => {
    if (!isLooping) setIsRandom(false)

    audioRef.current.loop = !isLooping
    setIsLooping(!isLooping)
  }

  const handleRandom = () => {
    if (!isRandom && isLooping) {
      setIsLooping(false)
      audioRef.current.loop = false
    }
    
    setIsRandom(!isRandom)
  }

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return (
    <>
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
          onClick={() => handlePrevious(isRandom)}
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
            onClick={() => handleNext(isRandom)}
          ></i>
          <i
            className={`fa-solid fa-shuffle mt-4 ${isRandom ? "active" : ""}`}
            onClick={handleRandom}
          ></i>
        </>
      </div>
    </>
  )
}

MusicPlayerControls.propTypes = {
  currentMusic: PropTypes.object,
  handlePrevious: PropTypes.func,
  handleNext: PropTypes.func
}

export default MusicPlayerControls