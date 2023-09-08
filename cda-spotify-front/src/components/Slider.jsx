import { useState, useEffect } from "react"
import PropTypes from "prop-types"

import MusicService from "../service/MusicService"
import SliderCard from "./SliderCard"
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

  const sliderScroll = (direction) => {
    const container = document.querySelector(`#${musicType}`)

    if (direction == "right") container.scrollLeft += 157 // card width
    else container.scrollLeft -= 157
  }

  return (
    musicList.length > 0 && (
      <div className="slider-component">
        <h2 className="text-center text-md-start">{title}</h2>
        <div>
          <i
            className="fa-solid fa-circle-arrow-right d-md-block d-none"
            onClick={() => sliderScroll("right")}
          ></i>
          <i
            className="fa-solid fa-circle-arrow-left d-md-block d-none"
            onClick={() => sliderScroll("left")}
          ></i>

          <div id={musicType} className="slider-container">
            <div className="slider">
              {musicList.map(({ id, title, imgUri }) => (
                <SliderCard key={id} id={id} title={title} imgUri={imgUri} />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  )
}

Slider.propTypes = {
  musicType: PropTypes.string,
  searchKey: PropTypes.string,
  title: PropTypes.string,
  selectedMusic: PropTypes.object
}

export default Slider
