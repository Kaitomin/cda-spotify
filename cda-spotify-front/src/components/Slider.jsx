import React, { useState, useEffect, useRef } from 'react'
import '../style.css'

class Props {
    title;
    img;
    titleSlider;
}

const Slider = ({title, titleSlider, imgUri} = Props) => {



  return (
    <div>
        <div className='slide-area'>
            <h2 className='slider-title'>{titleSlider}</h2>
            <div className='slider-bg'>
                <div className='slider-container'>
                    <div className='slider'>
                        <div className='slider-music-component'>
                            <a href="#">
                                <img src={imgUri} alt='image de la musique' />
                            </a>
                            <h3 className='slider-music-title'>{title}</h3>
                        </div>
                        <div className='slider-music-component'>
                            <a href="#">
                                <img src={imgUri} alt='image de la musique' />
                            </a>
                            <h3 className='slider-music-title'>{title}</h3>
                        </div>
                        <div className='slider-music-component'>
                            <a href="#">
                                <img src={imgUri} alt='image de la musique' />
                            </a>
                            <h3 className='slider-music-title'>{title}</h3>
                        </div>
                        <div className='slider-music-component'>
                            <a href="#">
                                <img src={imgUri} alt='image de la musique' />
                            </a>
                            <h3 className='slider-music-title'>{title}</h3>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
  )
}

export default Slider