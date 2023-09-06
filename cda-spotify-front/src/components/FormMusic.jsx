import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import MusicService from '../service/MusicService';
import TagService from '../service/TagService';
import ModalMessage from './ModalMessage';
import { sanitizeInput } from '../utils/CustomFunctions'
import '../style.css'

const FormMusic = () => { 
    const [tags, setTags] = useState();
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
    const [errors, setErrors] = useState({
        title: "",
        artist: "",
        releasedAt: "",
        tags: "",
        imgFile: "",
        audioFile: "",
    })
    const { musicId } = useParams()

    useEffect(() => {
        if (musicId) {
            MusicService.getById(musicId)
                .then(res => {
                    setMusic(res.data)
            })
        }
    }, [])

    useEffect(() => {
        TagService.getAll()
            .then(res => setTags(res.data))
    }, [])

    const handleCheck = (event) => {
        let updatedList = [...music.tags]

        if (event.target.checked) {
          updatedList.push(event.target.value)
        } else {
          updatedList.splice(updatedList.indexOf(event.target.value), 1)
        }

        // console.log(msgError);
        setErrors(prevErrors => ({
            ...prevErrors,
            tags: sanitizeInput(updatedList, 'tags'),
        }))
        setMusic({...music, tags: updatedList})
    }

    const isChecked = (item) => music.tags.includes(item) ? "checked-item" : "not-checked-item";

    const handleChange = e => {
        let { name, value, files } = e.target

        // err msg
        // console.log(msgError);
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: sanitizeInput(value, name),
        }))

        e.target.type == 'file' ?
        setMusic({...music, [name]: files[0]}) :
        setMusic({...music, [name]: value})
    }

    const handleSubmit = e => {
        e.preventDefault()

        // Check errors
        let hasError = false

        for (const key in music) {
            const msgError = sanitizeInput(music[key], key)

            setErrors(prevErrors => ({
                ...prevErrors,
                [key]: msgError,
            }))

            if (msgError) hasError = true
        }

        // Cancel form submission
        if (hasError) return
        
        // show loader
        setMsgModal(musicId ? "Mise à jour en cours" : "Ajout en cours")
        setLoader(true)
        setShowLoadingModal(true)
        
        const formData = new FormData()
        
        const newMusic  = {
            "title" : music.title,
            "artist" : music.artist,
            "releasedAt" : music.releasedAt,
            "tags" : music.tags
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
            .catch(() => {
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
            .catch(() => {
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
                            className={`form-control ${errors.title ? "is-invalid" : music.title ? "is-valid" : ""} input`}
                            value={music.title}
                            onChange={handleChange}
                        />
                        <div className="invalid-feedback">{errors.title}</div>
                    </label>
                    <label className='d-flex flex-column mb-3'>
                        Artiste
                        <input
                            type="text"
                            name="artist"
                            className={`form-control ${errors.artist ? "is-invalid" : music.artist ? "is-valid" : ""} input`}
                            value={music.artist}
                            onChange={handleChange}
                        />
                        <div className="invalid-feedback">{errors.artist}</div>

                    </label>

                    <label className='d-flex flex-column mb-3'>
                        Date de sortie
                        <input
                            type="date"
                            name="releasedAt"
                            className={`form-control ${errors.releasedAt ? "is-invalid" : music.releasedAt ? "is-valid" : ""} input`}
                            value={music.releasedAt}
                            onChange={handleChange}
                        />
                        <div className="invalid-feedback">{errors.releasedAt}</div>

                    </label>
                    <label className='d-flex flex-column mb-3'>
                        Image
                        <input
                            type="file"
                            name="imgFile"
                            className={`form-control ${errors.imgFile ? "is-invalid" : music.imgFile ? "is-valid" : ""} input`}
                            onChange={handleChange}
                        />
                        <div className="invalid-feedback">{errors.imgFile}</div>

                    </label>
                    <label className='d-flex flex-column mb-3'>
                        Audio
                        <input
                            type="file"
                            name="audioFile"
                            className={`form-control ${errors.audioFile ? "is-invalid" : music.audioFile ? "is-valid" : ""} input`}
                            onChange={handleChange}
                        />
                        <div className="invalid-feedback">{errors.audioFile}</div>

                    </label>
                </div>
                <div className="tags-container mt-3 mb-4">
                    <p className="title">Tags</p>
                    {errors.tags && <span className='text-danger'>{errors.tags}</span>}
                    <div className="tags-items d-flex justify-content-between flex-wrap text-center row-gap-1 column-gap-3">
                        { tags && tags.map(item => (
                            <div key={item}>
                                <input id={item} value={item} type="checkbox" className='d-none' onChange={handleCheck} checked={music.tags.includes(item)} />
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