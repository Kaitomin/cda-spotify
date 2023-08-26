import { useEffect, useState } from 'react'
import '../style.css'
import React from 'react'
import { useParams } from 'react-router-dom'
import MusicService from '../service/MusicService';
import TagService from '../service/TagService';
import useAuth from '../hook/useAuth'
import ModalMessage from './ModalMessage';

const FormMusic = () => { 
    const [tags, setTags] = useState();
    const [checkedTags, setCheckedTags] = useState([]);
    const [showLoadingModal, setShowLoadingModal] = useState(false)
    // const [showValidationModal, setShowValidationModal] = useState(false)
    const [msgModal, setMsgModal] = useState()
    const [loader, setLoader] = useState(false)
    const [music, setMusic] = useState({
        title: "",
        artist: "",
        releasedAt: "",
        tags: [],
        imgFile: null,
        audioFile: null
    })
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
        
        e.target.type == 'file' ?
        setMusic({...music, [name]: files[0]}) :
        setMusic({...music, [name]: value})
    }

    const handleSubmit = e => {
        e.preventDefault()

        // show loader
        setMsgModal(musicId ? "Mise à jour en cours" : "Ajout en cours")
        setLoader(true)
        setShowLoadingModal(true)

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
            MusicService.update(musicId, formData)
                .then(() => {
                    setMsgModal("Musique mise à jour")
                    setLoader(false)
                    setTimeout(() => {
                        setShowLoadingModal(false)
                    }, 2000)
                })
                .catch(e => {
                    setMsgModal("Erreur lors de la modification")
                    setLoader(false)
                    setTimeout(() => {
                        setShowLoadingModal(false)
                    }, 2000)
                })
        } else {
            MusicService.add(formData)
                .then(() => {
                    setMsgModal("Musique ajoutée")
                    setLoader(false)
                    setTimeout(() => {
                        setShowLoadingModal(false)
                    }, 2000)
                })
                .catch(e => {
                    setMsgModal("Erreur lors de l'ajout")
                    setLoader(false)
                    setTimeout(() => {
                        setShowLoadingModal(false)
                    }, 2000)
                })
        }      
    }
  
    return (
    <>
        <form className='music-form' onSubmit={handleSubmit}>
            <h1>{musicId ? "Modifier une musique" : "Ajouter une musique"}</h1>
            <label className='label' >
                Titre :
                <input type="text" 
                    name="title" 
                    className='input'
                    value={music.title}
                    onChange={handleChange}
                />
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
            </label>
            <label className='label'>
                Image :
                <input 
                    type="file" 
                    name="imgFile" 
                    className='input'
                    onChange={handleChange}
                />
            </label>
            <label className='label'>
                Audio :
                <input 
                    type="file" 
                    name="audioFile" 
                    className='input'
                    onChange={handleChange}
                />
            </label>
            <div className="tags">
            <div className="title">Tags : </div>
            <div className="list-container">
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
        <div className={`form-blocker d-flex vw-100 vh-100 position-fixed top-0 start-0 ${showLoadingModal ? "d-block" : "d-none"}`}></div>
        { showLoadingModal && <ModalMessage message={msgModal} loader={loader} /> }
    </>
  )
} 

export default FormMusic