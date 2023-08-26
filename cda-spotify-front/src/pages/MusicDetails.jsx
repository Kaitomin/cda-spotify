import React from 'react'

import { useParams } from 'react-router-dom';
import MusicPlayer from '../components/MusicPlayer'
import Slider from '../components/Slider';

const MusicDetails = () => {
  const { playlistId, musicIndex, musicId } = useParams()

  return (
    <div className='music-details'>
      <MusicPlayer playlistId={playlistId} musicIndex={musicIndex} musicId={musicId} />
      {/* Add sliders below */}
      <Slider musicType="artist" title="Par le même artiste"/>
      <Slider musicType="tag" title="Dans le même genre"/>
    </div>
  )
}

export default MusicDetails