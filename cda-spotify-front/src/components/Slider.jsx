import React, { useState, useEffect, useRef } from 'react'
import '../style.css'


const Slider = (props) => {



  return (
    <div>
        <div className='slide-area'>
            <h2 className='slider-title'>TITRE DU SLIDER</h2>
            <div className='slider-bg'>
                <div className='slider-container'>
                    <div className='slider'>
                        <div className='slider-music-component'>
                            <a href="#">
                                <img src='https://via.placeholder.com/225x225' alt='image de la musique' />
                            </a>
                            <h3 className='slider-music-title'>TITRE DE LA MUSIQUE</h3>
                        </div>
                        <div className='slider-music-component'>
                            <a href="#">
                                <img src='https://via.placeholder.com/225x225' alt='image de la musique' />
                            </a>
                            <h3 className='slider-music-title'>TITRE DE LA MUSIQUE</h3>
                        </div>
                        <div className='slider-music-component'>
                            <a href="#">
                                <img src='https://via.placeholder.com/225x225' alt='image de la musique' />
                            </a>
                            <h3 className='slider-music-title'>TITRE DE LA MUSIQUE</h3>
                        </div>
                        <div className='slider-music-component'>
                            <a href="#">
                                <img src='https://via.placeholder.com/225x225' alt='image de la musique' />
                            </a>
                            <h3 className='slider-music-title'>TITRE DE LA MUSIQUE</h3>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
  )
}

export default Slider