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
        <div className='music-form flex-grow-1'>
            <form onSubmit={handleSubmit} className='d-flex flex-column align-items-center justify-content-center'>
                <h1>{musicId ? "Modifier une musique" : "Ajouter une musique"}</h1>
                <div className='w-100'>
                    <label className='d-flex flex-column mb-3'>
                        Titre
                        <input type="text" 
                            name="title" 
                            className='input'
                            value={music.title}
                            onChange={handleChange}
                        />
                    </label>
                    <label className='d-flex flex-column mb-3'>
                        Artiste
                        <input 
                            type="text" 
                            name="artist" 
                            className='input'
                            value={music.artist}
                            onChange={handleChange}
                        />
                    </label>
                
                    <label className='d-flex flex-column mb-3'>
                        Date de sortie
                        <input 
                            type="date" 
                            name="releasedAt" 
                            className='input'
                            value={music.releasedAt}
                            onChange={handleChange}
                        />
                    </label>
                    <label className='d-flex flex-column mb-3'>
                        Image
                        <input 
                            type="file" 
                            name="imgFile" 
                            className='input'
                            onChange={handleChange}
                        />
                    </label>
                    <label className='d-flex flex-column mb-3'>
                        Audio
                        <input 
                            type="file" 
                            name="audioFile" 
                            className='input'
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="tags-container mt-3 mb-4">
                    <p className="title">Tags</p>
                    <div className="tags-items d-flex justify-content-between flex-wrap text-center row-gap-1 column-gap-3">
                        { tags && tags.map(item => (
                            <div key={item}>
                                <input id={item} value={item} type="checkbox" className='d-none' onChange={handleCheck} checked={checkedTags.includes(item)} />
                                <label htmlFor={item} className={`px-3 py-1 w-100 ${isChecked(item)}`}>{item}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <input type="submit" name="submit" value={musicId ? "Modifier" : "Ajouter"} />
            </form>
            <div className={`form-blocker d-flex vw-100 vh-100 position-fixed top-0 start-0 ${showLoadingModal ? "d-block" : "d-none"}`}></div>
            { showLoadingModal && <ModalMessage message={msgModal} loader={loader} /> }
        </div>
    )
} 

export default FormMusic