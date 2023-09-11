import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import '../style.css'
import MusicService from "../service/MusicService"
import HomeCard from "../components/HomeCard"

const Home = () => {
  const [musicData, setMusicData] = useState([])


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
            searchKey={selectedMusic.artist}
            title="Par le même artiste"
            selectedMusic={selectedMusic}
          />
          <Slider
            musicType="Tag"
            searchKey={selectedMusic.tags[0]}
            title="Dans le même genre"
            selectedMusic={selectedMusic}
          />
        </div>


    </div>


  )
}

export default Home