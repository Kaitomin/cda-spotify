import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdatePlaylistForm from '../components/UpdatePlaylistForm';
import { Link, useParams } from 'react-router-dom';

const DetailedPlaylist = () => {
    const [musicList, setMusicList] = useState([]);
    const [playlist, setPlaylist] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentMusicId, setCurrentMusicId] = useState(null);

    const { playlistId } = useParams();

    const getPlaylist = () => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/playlist/${playlistId}`)
            .then(response => {
                const data = response.data;
                setMusicList(data.musics)
                setPlaylist(data)
            });
    }
    useEffect(() => {
        getPlaylist()
    }, []);

    const handleDelete = (id) => {
        const answer = confirm("Retirer de la playlist ?")
        if (!answer) return

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/playlist/${playlistId}/removeMusic/${id}`)
            .then(getPlaylist())
    }
    const handleUpdatePlaylist = (childName) => {
        const newPlaylistData = {
            ...playlist,
            name:childName,
        }
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/1/updatePlaylist`,  newPlaylistData)
            .then(() =>{
            getPlaylist();
            setIsModalOpen(false);
            })
      }

    const handleClick = (e, id) => {       
        const buttons = document.querySelectorAll('.btn-container')
        const audios = document.querySelectorAll('.audio-tag')
        const currentBarContainer = document.querySelector(`.bars-${id}`)
        const allBarContainer = document.querySelectorAll('.music-bars')
        const currentBars = document.querySelectorAll(`.bars-${id} > .bar`)
        const allBars = document.querySelectorAll('.bar')

        if (isPlaying == false) {
            Array.from(buttons).map(btn => {
                const playIcon = btn.querySelector(".fa-circle-play")
                const stopIcon = btn.querySelector(".fa-circle-stop")
                currentBars.forEach(b => b.classList.add("animated"))
                currentBarContainer.classList.remove("hidden")

                if (btn.classList.contains(`btn-${id}`)) {
                    playIcon.classList.add("hidden")
                    stopIcon.classList.remove("hidden")
                } else {
                    playIcon.classList.remove("hidden")
                    stopIcon.classList.add("hidden")
                }
            })

            Array.from(audios).map(audio => {
                if (audio.classList.contains(`music-${id}`)) {
                    audio.play();
                } else {
                    audio.pause();
                    audio.currentTime = 0;
                }
            })
            setCurrentMusicId(id)
            setIsPlaying(!isPlaying)
        } else {
            Array.from(buttons).map(btn => {
                const playIcon = btn.querySelector(".fa-circle-play")
                const stopIcon = btn.querySelector(".fa-circle-stop")

                if (id == currentMusicId) {
                    playIcon.classList.remove("hidden")
                    stopIcon.classList.add("hidden")
                    currentBars.forEach(b => b.classList.remove("animated"))
                    currentBarContainer.classList.add("hidden")
                    setIsPlaying(false)
                }

                if (id != currentMusicId && btn.classList.contains(`btn-${id}`)) {
                    playIcon.classList.add("hidden")
                    stopIcon.classList.remove("hidden")
                    allBars.forEach(b => b.classList.remove("animated"))
                    currentBars.forEach(b => b.classList.add("animated"))
                    allBarContainer.forEach(b => b.classList.add("hidden"))
                    currentBarContainer.classList.remove("hidden")
                    setCurrentMusicId(id)
                    setIsPlaying(true)
                } else {
                    playIcon.classList.remove("hidden")
                    stopIcon.classList.add("hidden")
                }
            })

            Array.from(audios).map(audio => {
                if (audio.classList.contains(`music-${id}`) && id == currentMusicId) {
                    audio.pause();
                    audio.currentTime = 0;
                } else if (audio.classList.contains(`music-${id}`) && id != currentMusicId) {
                    audio.play()
                } else {
                    audio.pause();
                    audio.currentTime = 0;
                }                
            })
        }
    }

    const handleEnded = () => {
        const playIcon = document.querySelector(`.btn-${currentMusicId} > i.fa-circle-play`)
        const stopIcon = document.querySelector(`.btn-${currentMusicId} > i.fa-circle-stop`)
        const audio = document.querySelector(`.music-${currentMusicId}`)
        const currentBarContainer = document.querySelector(`.bars-${currentMusicId}`)
        const currentBars = document.querySelectorAll(`.bars-${currentMusicId} > .bar`)

        playIcon.classList.remove("hidden")
        stopIcon.classList.add("hidden")
        audio.pause()
        audio.currentTime = 0
        currentBarContainer.classList.add("hidden")
        currentBars.forEach(b => b.classList.remove("animated"))
    }

    return (
        <div className="playlist-page">
            <div>
                <h2>{playlist && playlist.name}</h2>
                {!isModalOpen && <i className="fa-solid fa-pen-to-square" onClick={() => setIsModalOpen(true)}></i>}
            </div>
            {isModalOpen && (
                <div className=''>
                    <UpdatePlaylistForm playlistName={playlist.name} handleUpdatePlaylist={handleUpdatePlaylist} />
                    <button onClick={() => setIsModalOpen(false)}>Annuler</button>
                </div>
            )} 
            <div className="music-list">
                {musicList.length == 0 && (
                    <div className="w-100 mt-5">
                        <h2>Empty playlist </h2>
                        <Link to="/musics">Visiter la bibliothèque de musiques</Link>
                    </div >
                )}
                {musicList && musicList.map((music, index) => (
                    <div key={music.id} className={`music-item track-${music.id}`}>
                        <div className="music-track">
                            <img src={`http://localhost:8080/img/${music.imgUri}`} alt={music.title} className="music-image" />
                            <audio className={`music-${music.id} audio-tag`} onEnded={handleEnded}>
                                <source src={`http://localhost:8080/audio/${music.audioUri}`} type='audio/mp3' />
                            </audio>
                            <div className={`btn-container btn-${music.id}`} onClick={(e) => handleClick(e, music.id)}>
                                <i className="fa-solid fa-circle-play"></i>
                                <i className="fa-solid fa-circle-stop hidden"></i>
                            </div>
                        </div>
                        <div>
                            <div className="music-details">
                                <Link to={`/playlist/${playlist.id}/music/${index}`}>
                                    <p className="music-title">{music.artist} - {music.title}</p>
                                </Link>
                            </div>

                            <div className={`music-bars bars-${music.id} hidden`}>
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
                        </div>
                        <i className="fa-solid fa-xmark" onClick={() => handleDelete(music.id)}></i>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DetailedPlaylist