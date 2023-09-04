import { useEffect, useState } from 'react'
import '../style.css'
import React from 'react'
import { useParams } from 'react-router-dom'
import MusicService from '../service/MusicService';
import TagService from '../service/TagService';
import useAuth from '../hook/useAuth'
import ModalMessage from './ModalMessage';
import {sanitizeInput} from '../utils/CustomFunctions'

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
    const [errors, setErrors] = useState({
        title: "",
        artist: "",
        releasedAt: "",
        tags: "",
        imgFile: "",
        audioFile: "",
      });
      const [touchedFields, setTouchedFields] = useState({
        title: false,
        artist: false,
        releasedAt: false,
        imgFile: false,
        audioFile: false,
      });
     const [tagError, setTagError] = useState(false);
     const [formSubmitted, setFormSubmitted] = useState(false);



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
        
        if (value) {
            setTouchedFields(prevTouchedFields => ({
                ...prevTouchedFields,
                [name]: true,
              }));
        }else{
            setTouchedFields(prevTouchedFields => ({
                ...prevTouchedFields,
                [name]: false,
              }));
        }

       


  

        // err msg
        const msgError = sanitizeInput(value, name)
        console.log(msgError);
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: msgError,

        }));



        e.target.type == 'file' ?
        setMusic({...music, [name]: files[0]}) :
        setMusic({...music, [name]: value})
    }

    const handleSubmit = e => {
        setFormSubmitted(true);
        
        e.preventDefault()
        for(const key in music){
            const msgError = sanitizeInput(music[key], key)
            setErrors(prevErrors => ({
                ...prevErrors,
                [key]: msgError,
            }))

        }     
        
        
        // show loader
        
        if (errors.title || errors.artist || errors.releasedAt || errors.audioFile || errors.imgFile) {
            console.log("errors");
            return
        }
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
        console.log(setFormSubmitted );
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
                            className={`form-control ${ errors.title ? "is-invalid" : touchedFields.title && music.title ? "is-valid" : ""} input`}
                            value={music.title}
                            onChange={handleChange}
                        />
                        {/* {touchedFields.title && !music.title && formSubmitted && <div className="invalid-feedback">Le champ est requis</div>} */}
                        <div className="invalid-feedback" >{ formSubmitted && errors.title}</div>
                        {/* className={` ${!errors.title ? "invisible" : "visible"}`} */}
                    </label>
                    <label className='d-flex flex-column mb-3'>
                        Artiste
                        <input
                            type="text"
                            name="artist"
                            className={`form-control ${ errors.artist ? "is-invalid" : touchedFields.artist && music.artist ? "is-valid" : ""} input`}
                            // className={`form-control ${touchedFields.artist && !music.artist ? "is-invalid" : touchedFields.artist && music.artist ? "is-valid" : ""} input`}
                            value={music.artist}
                            onChange={handleChange}
                        />
                        {/* {touchedFields.artist && !music.artist && formSubmitted && <div className="invalid-feedback">Le champ est requis</div>} */}
                        <div className="invalid-feedback" >{ formSubmitted && errors.artist}</div>

                    </label>

                    <label className='d-flex flex-column mb-3'>
                        Date de sortie
                        <input
                            type="date"
                            name="releasedAt"
                            className={`form-control ${ errors.releasedAt ? "is-invalid" : touchedFields.releasedAt && music.releasedAt ? "is-valid" : ""} input`}
                            value={music.releasedAt}
                            onChange={handleChange}
                        />
                        <div className="invalid-feedback" >{ formSubmitted && errors.releasedAt}</div>

                    </label>
                    <label className='d-flex flex-column mb-3'>
                        Image
                        <input
                            type="file"
                            name="imgFile"
                            className={`form-control ${ errors.imgFile ? "is-invalid" : touchedFields.imgFile && music.imgFile ? "is-valid" : ""} input`}
                            onChange={handleChange}
                        />
                        <div className="invalid-feedback" >{ formSubmitted && errors.imgFile}</div>

                    </label>
                    <label className='d-flex flex-column mb-3'>
                        Audio
                        <input
                            type="file"
                            name="audioFile"
                            className={`form-control ${ errors.audioFile ? "is-invalid" : touchedFields.audioFile && music.audioFile ? "is-valid" : ""} input`}
                            onChange={handleChange}
                        />
                        <div className="invalid-feedback" >{ formSubmitted && errors.audioFile}</div>

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