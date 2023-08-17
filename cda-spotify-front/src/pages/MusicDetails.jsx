import React from 'react'

import { useParams } from 'react-router-dom';
import MusicPlayer from '../components/MusicPlayer'

const MusicDetails = () => {
  const { playlistId, musicIndex, musicId } = useParams()

  return (
    <div className='music-details'>
      <MusicPlayer playlistId={playlistId} musicIndex={musicIndex} musicId={musicId} />
      {/* Add sliders below */}
    </div>
  )
}

export default MusicDetails