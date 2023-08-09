import { useState } from 'react'
import '../style.css'
import React from 'react'
import axios from 'axios'
import {useForm} from 'react-hook-form'

const FormMusic = () => {
    const {handleSubmit, register, formState : {errors}} = useForm()
    const baseUrl = "http://localhost:8080/api/music/new";
    const {post, setPost} = useState();
    
    let objFormData = new FormData();
    /*React.useEffect(() => {
        axios.get().then((response) => {
            register.data
        })
    })*/
   //axios.get(baseUrl).then((data) => console.log(data))

    function createPost () {
        axios.post(baseUrl,
                objFormData
        )
        .then((response) => {
            console.log("boop" + response)
        }).catch((exception) => {
            console.log(exception)
        })
    }

    function onSubmit (data) {

        let obj  = {
            "title" : data.title,
            "artist" : data.artist,
            "duration" : data.duration,
            "releasedAt" : "2014-05-25T08:20:03",
            "tags" : ["POP", "ROCK"]};
        
       objFormData.append("fileUpload", JSON.stringify(obj));
       objFormData.append("imgFile", data.imgUri);
       objFormData.append("audioFile", data.audioUri);
       console.log(objFormData);
       return objFormData;
        
    }

    // 3 champs dans un formdata : un obj avec les champs txt / img / son 
  
    return (
    
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <h1>Enregistrer une nouvelle musique</h1>
        <label className='label' >
            Titre de la musique :
            <input type="text" 
                name="title" 
                className='input' 
                {...register("title")}
            />
        </label>
        <label className='label'>
            Artiste de la musique :
            <input 
                type="text" 
                name="artist" 
                className='input'
                {...register("artist")}
                />
        </label>
        <label className='label'>
            Durée de la musique : 
            <input 
                type="text" 
                name="duration" 
                className='input'
                {...register("duration")}
                />
        </label>
        <label className='label'>
            Date de sortie de la musique : 
            <input 
                type="datetime-local" 
                name="releasedAt" 
                className='input'
                {...register("releasedAt")}
                />
        </label>
        <label className='label'>
            Image associée :
            <input 
                type="file" 
                name="imgUri" 
                className='input'
                {...register("imgUri")} 
                />
        </label>
        <label className='label'>
            Fichier de la musique :
            <input 
                type="file" 
                name="audioUri" 
                className='input'
                {...register("audioUri")}
                />
        </label>
        <label className='label'>Tag de la musique :
        <label className='checkbox'>
            Pop
            <input type="checkbox" name="pop" className='input' {...register("checkbox")}/>
        </label>
        <label className='checkbox'>
            Rock
            <input type="checkbox" name="rock" className='input' {...register("checkbox")}/>
        </label>
        <label className='checkbox'>
            AdrienLeBest
            <input type="checkbox" name="adrien" className='input' {...register("checkbox")}/>
        </label>
        <label className='checkbox'>
            Rap
            <input type="checkbox" name="rap" className='input' {...register("checkbox")}/>
        </label>
    </label>
    <label className='label'>
        <input type="submit" name="submit" value="Valider la musique" onClick={createPost()}/>
    </label>

    </form>




  )
}

export default FormMusic
//