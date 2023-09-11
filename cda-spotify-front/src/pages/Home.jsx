import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import '../style.css'
import MusicService from "../service/MusicService"
import HomeCard from "../components/HomeCard"
import Slider from "../components/Slider"

const Home = () => {
  const [musicData, setMusicData] = useState([])
  const [artistData, setArtistData] = useState()
  const [tagData, setTagData] = useState()
  const [selectedMusic, setSelectedMusic] = useState()

  useEffect(() => {
    MusicService.getFourRandom()
      .then((reponse) => {
        console.log(reponse.data);
        setMusicData(reponse.data)
      })
      .catch((error) => {
        console.log("ca marche pas mdr" + error);
      })
  }, [])

  useEffect(() => {
    if (musicData.length > 0 ) {
        const random = Math.floor(Math.random() * 4)
        console.log(random);
        setArtistData(musicData[random].artist)
        setTagData(musicData[random].tags[0])
        setSelectedMusic(musicData[random])
    }
  }, [musicData])


  return (
    <div className="home-page flex-grow-1">
      <h2>Laisse toi faire </h2>
      <div className="home-card-container">
          {musicData && musicData.map(({ id, title, imgUri, artist }) => (
            <div className="home-card" key={id}>
              <HomeCard id={id} title={title} imgUri={imgUri} artist={artist}/>
            </div>
          ))}
      </div>
      <div className="sliders-container d-flex flex-column row-gap-4">
          <Slider
            musicType="Artist"
            searchKey={artistData}
            title={`a la mémoire de  ${artistData}`}
            selectedMusic={selectedMusic}
          />
          <Slider
            musicType="Tag"
            searchKey={tagData}
            title={`dans le style ${tagData}`}
            selectedMusic={selectedMusic}
          />
        </div>


    </div>


  )
}

export default Home