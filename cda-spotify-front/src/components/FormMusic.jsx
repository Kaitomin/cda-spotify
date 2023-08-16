import { useEffect, useState } from 'react'
import '../style.css'
import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const FormMusic = () => {
    let url = `${import.meta.env.VITE_BACKEND_URL}/api/music/new`
    const checkList = ["POP", "ROCK", "ADRIEN"];
    const [checked, setChecked] = useState([]);
    const { musicId } = useParams()
    const [music, setMusic] = useState({
        title: "",
        artist: "",
        releasedAt: "",
        tags: [],
        imgFile: null,
        audioFile: null
    })

    if (musicId) {
        url = `${import.meta.env.VITE_BACKEND_URL}/api/music/update/${music.id}`
        useEffect(() => {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/music/${musicId}`)
                .then(res => {
                    setMusic(res.data)
                    setChecked(res.data.tags)
                })
        }, [])
    }

    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
          updatedList = [...checked, event.target.value];
        } else {
          updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
      };


    const isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";

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
            "releasedAt" : music.releasedAt,
            "tags" : checked
        }
        
        formData.append("fileUpload", 
            new Blob([JSON.stringify(newMusic)], {
                type: "application/json"
            })
        )

        if (musicId) {
            console.log("musicId")
            if (music.imgFile != null) formData.append("imgFile", music.imgFile);
            if (music.audioFile != null) formData.append("audioFile", music.audioFile);
        } else {
            console.log("null")
            formData.append("imgFile", music.imgFile);
            formData.append("audioFile", music.audioFile);
        }

        for (let pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }

        axios.post(url, formData)
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
                value={music.title}
                onChange={handleChange}
            />
        </label>
        <label className='label'>
            Artiste de la musique :
            <input 
                type="text" 
                name="artist" 
                className='input'
                value={music.artist}
                onChange={handleChange}
            />
        </label>
       
        <label className='label'>
            Date de sortie de la musique : 
            <input 
                type="date" 
                name="releasedAt" 
                className='input'
                value={music.releasedAt}
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
        <div className="checkList">
        <div className="title">Les tags de la musique:</div>
        <div className="list-container">
          {checkList.map((item, index) => (
            <div key={index}>
              <input value={item} type="checkbox" onChange={handleCheck} checked={checked.includes(item)}/>
              <span className={isChecked(item)}>{item}</span>
            </div>
          ))}
        </div>
      </div>
     
        <label className='label'>
            <input type="submit" name="submit" value="Valider la musique" />
        </label>
    </form>
  )
} 

export default FormMusic