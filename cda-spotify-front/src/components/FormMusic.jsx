import { useState } from 'react'
import '../style.css'
import React from 'react'
import {useForm} from 'react-hook-form'

const FormMusic = () => {
    const [input, setInputs] = useState({})
    const {handleSubmit, register, formState : {errors}} = useForm()
    
    function onSubmit (data) {
        console.log(data)
    }
  
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
            <input type="checkbox" name="pop" className='input'/>
        </label>
        <label className='checkbox'>
            Rock
            <input type="checkbox" name="rock" className='input'/>
        </label>
        <label className='checkbox'>
            AdrienLeBest
            <input type="checkbox" name="adrien" className='input'/>
        </label>
        <label className='checkbox'>
            Rap
            <input type="checkbox" name="rap" className='input'/>
        </label>
    </label>
    <label className='label'>
        <input type="submit" name="submit" value="Valider la musique"/>
    </label>

    </form>




  )
}

export default FormMusic