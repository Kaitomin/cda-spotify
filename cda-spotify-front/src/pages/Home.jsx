import { useEffect, useState } from "react"
import Cards from "../components/Cards"
import Slider from "../components/Slider"
import '../style.css'
import axios from "axios"

const Home = () => {

const [musicList, setMusicList] = useState([])
const [playlistName, setPlaylistName] = useState("")

const getPlaylist = () => {
  axios.get('http://localhost:8080/api/playlist')
  .then(res => {
    const data = res.data;
    if(data.musics && data.musics.length > 0) {
      setMusicList(data.musics);
      setPlaylistName(data.name);
      console.log("getPlaylist")
    }

  })

  useEffect(() => {
    getPlaylist();
  }, []);




}



  return (<>
  <div>plop</div>
  <div className="sliderMapping">
    <p>boop</p>
    <div className="list-container">
    {musicList.map((item, index) => {
      <div key={index}>
        <Slider  title={item.name} img={item.imgUri} titleSlider={"Playlist"}>playlist est tu là</Slider>
      </div>})}
    </div>
  </div>
    </>
  )
}

export default Home
/*
<div className="checkList">
        <div className="title">Les tags de la musique:</div>
        <div className="list-container">
          {checkList.map((item, index) => (
            <div key={index}>
              <input value={item} type="checkbox" onChange={handleCheck} />
              <span className={isChecked(item)}>{item}</span>
            </div>
          ))}
        </div>
      </div> */