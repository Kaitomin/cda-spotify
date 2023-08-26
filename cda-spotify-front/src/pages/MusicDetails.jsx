import React, { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom';
import MusicPlayer from '../components/MusicPlayer'
import Slider from '../components/Slider';
import MusicService from '../service/MusicService';
import PlaylistService from '../service/PlaylistService';
import { useNavigate } from 'react-router-dom'

const MusicDetails = () => {
  const { playlistId, musicIndex, musicId } = useParams()
  const [selectedMusic, setSelectedMusic] = useState()
  const [selectedMusicsList, setSelectedMusicsList] = useState()
  const [selectedIndex, setSelectedIndex] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    console.log("...")
    // Acessing from music page
    if (musicId) {
      MusicService.getById(musicId) 
      .then(res => {
        setSelectedMusic(res.data)
      })

      MusicService.getAll()
        .then(res => {
          const indexOfCurrentMusic = res.data.findIndex(m => m.id == musicId)
          setSelectedIndex(indexOfCurrentMusic)
          setSelectedMusicsList(res.data)
        })
    // Accessing from playlist page
    } else {
      PlaylistService.getById(playlistId)
      .then(res => {
        setSelectedMusicsList(res.data)
        setSelectedMusic(res.data.musics[musicIndex])
      })
    }
  }, [musicId])

  const updateSelectedMusic = music => {
    console.log(music)
    setSelectedMusic(music)
    navigate(`/music/${music.id}`)
  }

  return (
    <div className='music-details'>
      <MusicPlayer selectedMusicsList={selectedMusicsList} selectedMusic={selectedMusic} selectedIndex={musicId ? selectedIndex : musicIndex} updateSelectedMusic={updateSelectedMusic} />
      {/* Add sliders below */}
      { selectedMusic &&
        <>
          <Slider musicType="Artist" searchKey={selectedMusic.artist} title="Par le même artiste" selectedMusic={selectedMusic} updateSelectedMusic={updateSelectedMusic} />
          <Slider musicType="Tag" searchKey={selectedMusic.tags[0]} title="Dans le même genre" selectedMusic={selectedMusic} updateSelectedMusic={updateSelectedMusic} />
        </>
      }
    </div>
  )
}

export default MusicDetails