import { useEffect, useState } from 'react'
import '../style.css'
import React from 'react'
import { useParams } from 'react-router-dom'
import MusicService from '../service/MusicService';
import TagService from '../service/TagService';
import useAuth from '../hook/useAuth'

const FormMusic = () => { 
    const [tags, setTags] = useState();
    const [checkedTags, setCheckedTags] = useState([]);
    const [music, setMusic] = useState({
        title: "",
        artist: "",
        releasedAt: "",
        tags: [],
        imgFile: null,
        audioFile: null
    })
    const [errors, setErrors] = useState({
        title:"",
        artist:"",
        releasedAt:"",
        imgFile:"",
        audioFile:"",
    })
     const [tagError, setTagError] = useState(false);
    // const [titleError, setTitleError] = useState(false);
    // const [artistError, setArtistError] = useState(false);
    // const [releasedAtError, setReleasedAtError] = useState(false);
    // const [imgError, setImgError] = useState(false);
    // const [audioError, setAudioError] = useState(false);


    const { currentUser } = useAuth()
    const { musicId } = useParams()

    if (musicId) {
        useEffect(() => {
            MusicService.getById(musicId)
                .then(res => {
                    setMusic(res.data)
                    setCheckedTags(res.data.tags)
                })
        }, [])
    }

    useEffect(() => {
        TagService.getAll()
            .then(res => setTags(res.data))
    }, [])

    const handleCheck = (event) => {
        let updatedList = [...checkedTags]

        if (event.target.checked) {
          updatedList = [...checkedTags, event.target.value]
        } else {
          updatedList.splice(checkedTags.indexOf(event.target.value), 1)
        }
        setCheckedTags(updatedList)
    }

    const isChecked = (item) =>
    checkedTags.includes(item) ? "checked-item" : "not-checked-item";

    const handleChange = e => {
        let { name, value, files } = e.target
        
        //if (music.title === "") setErrors({...errors, title : "Le titre est requis"});
        if (e.target.value == "") setErrors


        // const validationErrors = {
        //     title: name === 'title' && value === '',
        //     artist: name === 'artist' && value === '',
        //     releasedAt: name === 'releasedAt' && value === '',
        //     imgFile: name === 'imgFile' && !files[0],
        //     audioFile: name === 'audioFile' && !files[0],
        // }
        // setErrors(prevErrors => ({ ...prevErrors, ...validationErrors }));

        e.target.type == 'file' ?
        setMusic({...music, [name]: files[0]}) :
        setMusic({...music, [name]: value})


    }

    const handleSubmit = e => {
        e.preventDefault()

        if (errors.title || errors.artist) {
            return
        }

        const formData = new FormData()
        
        const newMusic  = {
            "title" : music.title,
            "artist" : music.artist,
            "releasedAt" : music.releasedAt,
            "tags" : checkedTags
        }
        
        formData.append("fileUpload", 
            new Blob([JSON.stringify(newMusic)], {
                type: "application/json"
            })
        )
        formData.append("imgFile", music.imgFile);
        formData.append("audioFile", music.audioFile);

        if (musicId) {
            MusicService.update(musicId, formData, currentUser.token)
                .then(() => console.log("updated"))
        } else {
            MusicService.add(formData, currentUser.token)
                .then(() => console.log("added"))
        }
        // pour check si au moin un tag est selec
        if (checkedTags.length === 0) {
            setTagError(true);
            return; 
        } else {
            setTagError(false);
        }
       //if (music.title === "") setErrors({...errors, title : "Le titre est requis"});
        // if (name === 'artist') setErrors(value === '');
        // if (name === 'releasedAt') setErrors(value === '');
        // if (name === 'imgFile') setErrors(!files[0]);
        // if (name === 'audioFile') setErrors(!files[0]);      
    }
  
    return (    
    <form className='music-form' onSubmit={handleSubmit}>
        <h1>Ajouter une musique</h1>
        <label className='label' >
            Titre :
            <input type="text" 
                name="title" 
                className='input'
                value={music.title}
                onChange={handleChange}
            />
                {errors.title && <span className="error-message">{errors.title}</span>}
        </label>
        <label className='label'>
            Artiste :
            <input 
                type="text" 
                name="artist" 
                className='input'
                value={music.artist}
                onChange={handleChange}
            />
               {errors.artist && <span className="error-message">{errors.artist}</span>}
        </label>
       
        <label className='label'>
            Date de sortie : 
            <input 
                type="date" 
                name="releasedAt" 
                className='input'
                value={music.releasedAt}
                onChange={handleChange}
            />
            {errors.releasedAt && <span className="error-message">La date est requis</span>}
        </label>
        <label className='label'>
            Image :
            <input 
                type="file" 
                name="imgFile" 
                className='input'
                onChange={handleChange}
            />
            {errors.imgFile && <span className="error-message">l'image est requis</span>}
        </label>
        <label className='label'>
            Audio :
            <input 
                type="file" 
                name="audioFile" 
                className='input'
                onChange={handleChange}
            />
            {errors.audioFile && <span className="error-message">L'audio est requis</span>}
        </label>
        <div className="tags">
        <div className="title">Tags : </div>
        <div className="list-container">
        {tagError && <span className="error-message">Sélectionnez au moins un tag</span>}
          { tags && tags.map(item => (
            <div key={item}>
              <input value={item} type="checkbox" onChange={handleCheck} checked={checkedTags.includes(item)}/>
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