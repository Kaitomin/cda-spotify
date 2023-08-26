import React, { useState, useEffect, useRef } from 'react'
import MusicService from '../service/MusicService';
import '../style.css'



const Slider = ({musicType, title}) => {
    const [musicList, setMusicList] = useState([]);

    useEffect(() => {
        if (musicType === 'artist') {
            MusicService.getByArtist('adrien')
                .then(response => {
                    console.log(response.data);
                    setMusicList(response.data);
                });
        } else if (musicType === 'tag') {
            MusicService.getByTag('POP')
                .then(response => {
                    setMusicList(response.data);
                    console.log(response.data);

                });
        }
    }, [musicType]);

  return (
    <div>
        <h1 className='text-start'>{title}</h1>
        <div className=''>
            <div className='slider-container'>
                <div className='slider'>
                {musicList.map((music, index) => (
                    <div className='slider-music-component' key={index}>
                        <a href="#">
                            <img src={`${import.meta.env.VITE_RESOURCE_IMG_URL}/${music.imgUri}`} alt='image de la musique' />
                        </a>
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