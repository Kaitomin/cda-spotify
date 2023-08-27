import React, { useState, useEffect } from 'react'
import MusicService from '../service/MusicService';
import '../style.css'

const Slider = ({musicType, searchKey, title, selectedMusic, updateSelectedMusic}) => {
    const [musicList, setMusicList] = useState([])

    useEffect(() => {
        MusicService.getByTypeAndSearchkey(musicType, searchKey)
            .then(response => {
                const filtered = response.data.filter(music => music.id != selectedMusic.id)
                setMusicList(filtered)
                // console.log(response.data)
            })
    }, [selectedMusic])

     return (
        musicList.length > 0 && 
        <div>
            <h2 className='text-start'>{title}</h2>
            <div className=''>
                <div className='slider-container'>
                    <div className='slider'>
                    {musicList.map(music  => (
                        <div className='slider-music-component' key={music.id}>
                            <div onClick={() => updateSelectedMusic(music)}>
                                <img src={`${import.meta.env.VITE_RESOURCE_IMG_URL}/${music.imgUri}`} alt='image de la musique' />
                                <h3 className='slider-music-title my-3'>{music.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Slider