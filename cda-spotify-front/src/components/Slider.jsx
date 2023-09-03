import React, { useState, useEffect } from "react"
import MusicService from "../service/MusicService"
import { Link } from "react-router-dom"
import "../style.css"

const Slider = ({ musicType, searchKey, title, selectedMusic }) => {
  const [musicList, setMusicList] = useState([])

  useEffect(() => {
    MusicService.getByTypeAndSearchkey(musicType, searchKey).then(
      (response) => {
        const filtered = response.data.filter(
          (music) => music.id != selectedMusic.id
        )
        setMusicList(filtered)
      }
    )
  }, [selectedMusic])

  const sliderScroll = direction => {
    const container = document.querySelector(`#${musicType}`)

    if (direction == 'right') container.scrollLeft += 157 // card width
    else container.scrollLeft -= 157
  }

  return (
    musicList.length > 0 && (
      <div className="slider-component">
        <h2 className="text-center text-md-start">{title}</h2>
        <div>
          <i className="fa-solid fa-circle-arrow-right d-md-block d-none" onClick={() => sliderScroll('right')}></i>
          <i className="fa-solid fa-circle-arrow-left d-md-block d-none" onClick={() => sliderScroll('left')}></i>

          <div id={musicType} className="slider-container">
            <div className="slider">
              {musicList.map((music, index) => (
                <div className="slider-music-component" key={music.id} id={`item-${index}`}>
                  <Link to={`/music/${music.id}`}>
                    <img
                      src={`${import.meta.env.VITE_RESOURCE_IMG_URL}/${
                        music.imgUri
                      }`}
                      alt="image de la musique"
                    />
                    <h3 className="slider-music-title my-3">{music.title}</h3>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default Slider
