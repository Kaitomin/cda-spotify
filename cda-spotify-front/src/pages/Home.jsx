import { useEffect } from "react"
import { useState } from "react"

import MusicService from "../service/MusicService"
import HomeCard from "../components/HomeCard"
import Slider from "../components/Slider"
import '../style.css'
import Loader from "../components/Loader"

const Home = () => {
  const [musicData, setMusicData] = useState([])
  const [artistData, setArtistData] = useState()
  const [tagData, setTagData] = useState()
  const [selectedMusic, setSelectedMusic] = useState()

  useEffect(() => {
    MusicService.getFourRandom()
      .then((reponse) => {
        setMusicData(reponse.data)
      })
      .catch((error) => {
        console.log("ca marche pas mdr" + error);
      })
  }, [])

  useEffect(() => {
    if (musicData.length > 0 ) {
        const random = Math.floor(Math.random() * 4)
        setArtistData(musicData[random].artist)
        setTagData(musicData[random].tags[0])
        setSelectedMusic(musicData[random])
    }
  }, [musicData])


  return (
    <div className="home-page flex-grow-1">
      {musicData.length == 0 && 
        <div className="d-flex flex-column align-items-center mt-3">
          <Loader />
          <span>Loading...</span>
        </div>
      }
      {musicData.length > 0 &&
        <>
          <h1 className="mt-3">A découvrir</h1>
          <div className="home-card-container">
              {musicData && musicData.map(({ id, title, imgUri, artist }) => (
                <div className="home-card" key={id}>
                  <HomeCard id={id} title={title} imgUri={imgUri} artist={artist}/>
                </div>
              ))}
          </div>
          { artistData && tagData &&
            <div className="sliders-container d-flex flex-column row-gap-4 mt-4">
              <Slider
                musicType="Artist"
                searchKey={artistData}
                title={`Par l'artiste ${artistData}`}
                selectedMusic={selectedMusic}
                />
              <Slider
                musicType="Tag"
                searchKey={tagData}
                title={`Dans le style ${tagData}`}
                selectedMusic={selectedMusic}
                />
            </div>
          }
        </>
      }
    </div>
  )
}

export default Home