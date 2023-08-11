import axios from 'axios'
import React, { useState, useEffect } from 'react'

function Tmp() {
  const [music, setMusic] = useState({})
  
  const show = id => {
    axios.get(`http://localhost:8080/api/music/${id}`)
      .then(res => {
        console.log(res.data)
        setMusic(res.data)
      })
  }

  return (
    <div>
      <p>{music.title}</p>
      <p>{music.imgUri}</p>
      <p>{music.audioUri}</p>
      <button onClick={() => show(1)}>Fetch 1</button>
      <button onClick={() => show(2)}>Fetch 2</button>
      <button onClick={() => show(3)}>Fetch 3</button>
      <button onClick={() => show(4)}>Fetch 4</button>
      {music.imgUri && <img src={`http://localhost:8080/img/${music.imgUri}`} width="250" />}
      {music.audioUri &&
        <audio key={music.id} controls>
          <source src={`http://localhost:8080/audio/${music.audioUri}`} type="audio/mp3" />
        </audio>
      }
    </div>
  )
}

export default Tmp