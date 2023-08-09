import { useState } from 'react'
import '../style.css'
import React from 'react'
import axios from 'axios'

const FormMusic = () => {
    const baseUrl = "http://localhost:8080/api/music/new";
    const [music, setMusic] = useState({
        title: "",
        artist: "",
        duration: "",
        releasedAt: "",
        tags: ["POP"],
        imgFile: null,
        audioFile: null
    })
    const handleChange = e => {
        let {name, value, files} = e.target
        
        e.target.type == 'file' ?
        setMusic({...music, [name]: files[0]}) :
        setMusic({...music, [name]: value})
    }

    const handleSubmit = e => {
        e.preventDefault()

        const formData = new FormData()

        const newMusic  = {
            "title" : music.title,
            "artist" : music.artist,
            "duration" : music.duration,
            "releasedAt" : music.releasedAt,
            "tags" : music.tags
        }
        
        formData.append("fileUpload", 
            new Blob([JSON.stringify(newMusic)], {
                type: "application/json"
            }))
        formData.append("imgFile", music.imgFile);
        formData.append("audioFile", music.audioFile);

        axios.post(baseUrl, formData)
            .then(response => console.log(response.data))
            .catch(exception => console.log(exception))        
    }
  
    return (    
    <form className='form' onSubmit={handleSubmit}>
        <h1>Enregistrer une nouvelle musique</h1>
        <label className='label' >
            Titre de la musique :
            <input type="text" 
                name="title" 
                className='input' 
                onChange={handleChange}
            />
        </label>
        <label className='label'>
            Artiste de la musique :
            <input 
                type="text" 
                name="artist" 
                className='input'
                onChange={handleChange}
            />
        </label>
        <label className='label'>
            Durée de la musique : 
            <input 
                type="text" 
                name="duration" 
                className='input'
                onChange={handleChange}
            />
        </label>
        <label className='label'>
            Date de sortie de la musique : 
            <input 
                type="datetime-local" 
                name="releasedAt" 
                className='input'
                onChange={handleChange}
            />
        </label>
        <label className='label'>
            Image associée :
            <input 
                type="file" 
                name="imgFile" 
                className='input'
                onChange={handleChange}
            />
        </label>
        <label className='label'>
            Fichier de la musique :
            <input 
                type="file" 
                name="audioFile" 
                className='input'
                onChange={handleChange}
            />
        </label>
        <label className='label'>Tag de la musique :
            <label className='checkbox'>
                Pop
                <input type="checkbox" name="pop" className='input' />
            </label>
            <label className='checkbox'>
                Rock
                <input type="checkbox" name="rock" className='input' />
            </label>
            <label className='checkbox'>
                AdrienLeBest
                <input type="checkbox" name="adrien" className='input' />
            </label>
            <label className='checkbox'>
                Rap
                <input type="checkbox" name="rap" className='input' />
            </label>
        </label>
        <label className='label'>
            <input type="submit" name="submit" value="Valider la musique" />
        </label>
    </form>
  )
}

export default FormMusic