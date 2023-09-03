import React, { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom';
import MusicPlayer from '../components/MusicPlayer'
import Slider from '../components/Slider';
import DetailedPlaylist from '../components/DetailedPlaylist';
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
        setSelectedMusicsList(res.data.musics)
        setSelectedMusic(res.data.musics[musicIndex])
      })
    }    
  }, [musicId])

  useEffect(() => {
    if (musicId) return

    PlaylistService.getById(playlistId)
    .then(res => {
      setSelectedMusicsList(res.data.musics)
      setSelectedMusic(res.data.musics[musicIndex])
    })
  }, [musicIndex])

  const updateSelectedMusic = (music, index) => {
    setSelectedMusic(music)
    if (musicId) navigate(`/music/${music.id}`)
    else navigate(`/playlist/${playlistId}/music/${+index}`)
  }

  return (
    <div className='music-details flex-grow-1'>
      <MusicPlayer 
        selectedMusicsList={selectedMusicsList} 
        selectedMusic={selectedMusic} 
        selectedIndex={musicId ? selectedIndex : musicIndex} 
        updateSelectedMusic={updateSelectedMusic}
      />      
      { playlistId && <DetailedPlaylist showActions={false} isIntegrated={true} musicIndex={musicIndex} /> }
      { selectedMusic &&
        <div className='sliders-container d-flex flex-column row-gap-4'>
          <Slider musicType="Artist" searchKey={selectedMusic.artist} title="Par le même artiste" selectedMusic={selectedMusic} />
          <Slider musicType="Tag" searchKey={selectedMusic.tags[0]} title="Dans le même genre" selectedMusic={selectedMusic} />
        </div>
      }
    </div>
  )
}

export default MusicDetails