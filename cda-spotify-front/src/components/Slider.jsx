import React, { useState, useEffect } from 'react'
import MusicService from '../service/MusicService';
import { Link } from 'react-router-dom';
import '../style.css'

const Slider = ({musicType, searchKey, title}) => {
    const [musicList, setMusicList] = useState([])

    useEffect(() => {
        if (musicType === 'artist') {
            MusicService.getByArtist(searchKey)
                .then(response => {
                    console.log(response.data)
                    setMusicList(response.data)
                })
        } else if (musicType === 'tag') {
            MusicService.getByTag(searchKey)
                .then(response => {
                    setMusicList(response.data)
                    console.log(response.data)

                })
        }
    }, [])

  return (
    <div>
        <h2 className='text-start'>{title}</h2>
        <div className=''>
            <div className='slider-container'>
                <div className='slider'>
                {musicList.map(music  => (
                    <div className='slider-music-component' key={music.id}>
                        <Link to={`/music/${music.id}`}>
                            <img src={`${import.meta.env.VITE_RESOURCE_IMG_URL}/${music.imgUri}`} alt='image de la musique' />
                        </Link>
                        <h3 className='slider-music-title my-3'>{music.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    </div>
    </div>
  )
}

export default Slider