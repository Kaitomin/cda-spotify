import React, { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom';
import MusicPlayer from '../components/MusicPlayer'
import Slider from '../components/Slider';
import MusicService from '../service/MusicService';
import PlaylistService from '../service/PlaylistService';

const MusicDetails = () => {
  const { playlistId, musicIndex, musicId } = useParams()
  const [currentMusic, setCurrentMusic] = useState()

  useEffect(() => {
    // From music page
    if (musicId) {
      MusicService.getById(musicId) 
      .then(res => {
        setCurrentMusic(res.data)
      })
    // From playlist page
    } else {
      PlaylistService.getById(playlistId)
      .then(res => {
        setCurrentMusic(res.data.musics[musicIndex])
      })
    }
  }, [])

  return (
    <div className='music-details'>
      <MusicPlayer playlistId={playlistId} musicIndex={musicIndex} musicId={musicId} />
      {/* Add sliders below */}
      { currentMusic &&
        <>
          <Slider musicType="artist" searchKey={currentMusic.artist} title="Par le même artiste"/>
          <Slider musicType="tag" searchKey={currentMusic.tags[0]} title="Dans le même genre"/>
        </>
      }
    </div>
  )
}

export default MusicDetails