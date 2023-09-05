import React, {useState, useEffect, useRef} from "react";
import PlaylistService from "../service/PlaylistService";
import useAuth from "../hook/useAuth";
import "../style.css";

const MusicPlayer = ({selectedMusicsList, selectedMusic, selectedIndex, updateSelectedMusic}) => {
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [currentMusic, setCurrentMusic] = useState();
  const [musicList, setMusicList] = useState();
  const [playlists, setPlaylists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState();
  const {currentUser, checkCookie} = useAuth();
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  // Check for current connected user
  useEffect(() => {
    if (!isAuthenticated) 
      return;
    
    checkCookie(["CLIENT", "ADMIN"]);
  }, []);

  // Set musics list and current music
  useEffect(() => {
    setMusicList(selectedMusicsList);
    setCurrentMusic(selectedMusic);
    setCurrentIndex(
      selectedIndex
      ? selectedIndex
      : 0);

    // if user is logged in, get all his playlists
    if (!currentUser.id) 
      return;
    
    PlaylistService.getPlaylistByUserId(currentUser.id).then(res => setPlaylists(res.data));
  }, [selectedMusic, selectedMusicsList]);

  // Autoplay audio
  useEffect(() => {
    if (audioRef.current && currentMusic) {
      audioRef.current.play();
      setIsPlaying(!audioRef.current.paused);
    }
  }, [currentMusic]);

  // Check if current music is in user's Favoris
  useEffect(() => {
    if (playlists.length == 0 || currentMusic == null) 
      return;
    
    const filteredMusic = playlists[0].musics.filter(m => m.id == currentMusic.id);

    if (filteredMusic.length != 0) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [playlists, currentMusic]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    if (isRandom) {
      let newRandomIndex = Math.floor(Math.random() * musicList.length);
      while (newRandomIndex === currentIndex) {
        newRandomIndex = Math.floor(Math.random() * musicList.length);
      }
      setCurrentIndex(newRandomIndex);
      updateSelectedMusic(musicList[newRandomIndex], newRandomIndex);
    } else {
      const prevIndex = currentIndex == 0
        ? musicList.length - 1
        : currentIndex - 1;
      setCurrentIndex(prevIndex);
      updateSelectedMusic(musicList[prevIndex], prevIndex);
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    const splitted = currentMusic.duration.split(":");
    setDuration(parseInt(splitted[0]) * 60 + parseInt(splitted[1]));
  };

  const handleEnd = () => {
    // Reset duration back to 0
    if (!isLooping && !isRandom) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } else if (!isLooping) 
      handleNext();
    
    return;
  };

  const handleTimelineClick = e => {
    const timelineWidth = e.currentTarget.clientWidth;
    const clickPosition = e.nativeEvent.offsetX;
    const newTime = (clickPosition / timelineWidth) * duration;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleNext = () => {
    if (isRandom) {
      let newRandomIndex = Math.floor(Math.random() * musicList.length);
      while (newRandomIndex === currentIndex) {
        newRandomIndex = Math.floor(Math.random() * musicList.length);
      }
      setCurrentIndex(newRandomIndex);
      updateSelectedMusic(musicList[newRandomIndex], newRandomIndex);
    } else {
      const prevIndex = currentIndex == musicList.length - 1
        ? 0
        : + currentIndex + 1;
      setCurrentIndex(prevIndex);
      updateSelectedMusic(musicList[prevIndex], prevIndex);
    }
  };

  const formatTime = timeInSeconds => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10
      ? "0"
      : ""}${seconds}`;
  };

  const handleLoop = () => {
    if (!isLooping) 
      setIsRandom(false);
    
    audioRef.current.loop = !isLooping;
    setIsLooping(!isLooping);
  };

  const handleRandom = e => {
    if (!isRandom) 
      setIsLooping(false);
    
    setIsRandom(!isRandom);
  };

  const displayPlaylistsModal = () => {
    if (!currentUser.id) {
      console.log("Not logged in");
      return;
    }

    setShowModal(true);
  };

  const addToPlaylist = id => {
    // Display message: "Must be connected"
    if (!currentUser.id) {
      console.log("Not logged in");
      return;
    }

    // Check if music already exists in playlist
    const filteredMusic = playlists.filter(p => p.id == id)[0].musics.filter(m => m.id == currentMusic.id);
    if (filteredMusic.length != 0) {
      return;
    }

    PlaylistService.addMusic(id, currentMusic).then(() => {
      console.log("Musique ajoutée à la playlist");
      setShowModal(!showModal);
    });
  };

  const addToFavorite = () => {
    // Display message: "Must be connected"
    if (!currentUser.id) {
      console.log("Not logged in");
      return;
    }

    PlaylistService.addMusic(playlists[0].id, currentMusic).then(() => {
      console.log("Ajoutée aux favoris");
      setIsFavorite(true);
    });
  };

  const removeToFavorite = () => {
    if (!currentUser.id) {
      console.log("Not logged in");
      return;
    }
    PlaylistService.removeMusic(playlists[0].id, currentMusic.id).then(() => {
      console.log("Retirée des favoris");
      setIsFavorite(false);
    });
  };

  return (<div className="music-player text-light position-relative">
    {
      currentMusic && (<div className="mx-auto px-3 py-3">
        <div>
          <div className="d-flex justify-content-center align-items-center vh-45">
            <img className="img-player bg-body rounded-top w-100 object-fit-cover" src={`${import.meta.env.VITE_RESOURCE_IMG_URL}/${
              currentMusic.imgUri}`} height={350}/>
          </div>

          <div className="d-flex justify-content-around rounded-bottom actions">
            {!isFavorite && (<i className="fa-regular fa-heart" onClick={addToFavorite}></i>)}
            {isFavorite && (<i className="fa-solid fa-heart" onClick={removeToFavorite}></i>)}

            <div>
              <i className="fa-solid fa-circle-plus" onClick={displayPlaylistsModal}></i>
              {
                showModal && (<div className="playlist-modal">
                  <p>Ajouter à ...</p>
                  {
                    playlists && playlists.map(p => p.name != "Favoris" && (<div key={p.id} onClick={() => addToPlaylist(p.id)}>
                      {p.name}
                    </div>))
                  }
                  <div onClick={() => setShowModal(false)}>
                    <i className="fa-solid fa-circle-xmark"></i>
                  </div>
                </div>)
              }
            </div>
            <i className="fa-solid fa-share"></i>
          </div>
        </div>

        <div className="controls-container d-flex flex-column justify-content-around gap-3">
          <div className="mt-4">
            <h2 className="text-center fw-bold">{currentMusic.title}</h2>
            <h3 className="text-center">{currentMusic.artist}</h3>
          </div>
          <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} onEnded={handleEnd} src={`${import.meta.env.VITE_RESOURCE_AUDIO_URL}/${
            currentMusic.audioUri}`}/>

          <div className="controls d-flex align-items-center flex-wrap justify-content-around">
            <div className="d-flex justify-content-between w-100 timer">
              <div>{formatTime(currentTime)}</div>
              <div>{formatTime(duration)}</div>
            </div>
            <div className="timeline w-100 bg-white position-relative" onClick={handleTimelineClick}>
              <div className="progress position-absolute top-0 start-0" style={{
                  width: `${ (currentTime / duration) * 100}%`
                }}></div>
            </div>
            <i className={`fa-solid fa-rotate-left mt-4 ${
              isLooping
                ? "loop active"
                : ""}`} onClick={handleLoop}></i>
            <i className="fa-solid fa-backward mt-4" onClick={handlePrevious}></i>
            {
              isPlaying
                ? (<i className="fa-solid fa-pause mt-4 active" onClick={togglePlay}></i>)
                : (<i className="fa-solid fa-play mt-4" onClick={togglePlay}></i>)
            }
            <> <i className="fa-solid fa-forward mt-4" onClick={handleNext}></i>
            <i className={`fa-solid fa-shuffle mt-4 ${
              isRandom
                ? "active"
                : ""}`} onClick={handleRandom}></i>
          </>
        </div>
        <div className="tags">
          {currentMusic.tags.map(tag => (<span key={tag}>{tag}</span>))}
        </div>
      </div>
    </div>)
    }
  </div>);
};
export default MusicPlayer;
