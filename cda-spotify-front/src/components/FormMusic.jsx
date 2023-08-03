import '../style.css'

const FormMusic = () => {
  return (
    
    <form className='form'>
        <h1>Enregistrer une nouvelle musique</h1>
        <label className='label'>
            Titre de la musique :
            <input type="text" name="title" className='input'/>
        </label>
        <label className='label'>
            Artiste de la musique :
            <input type="text" name="artist" className='input'/>
        </label>
        <label className='label'>
            Durée de la musique : 
            <input type="text" name="duration" className='input'/>
        </label>
        <label className='label'>
            Date de sortie de la musique : 
            <input type="datetime-local" name="releasedAt" className='input'/>
        </label>
        <label className='label'>
            Image associée :
            <input type="file" name="imgUri" className='input'/>
        </label>
        <label className='label'>
            Fichier de la musique :
            <input type="file" name="audioUri" className='input'/>
        </label>
        <h2>Tag de la musique :</h2>
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
    
        <input type="button" name="submit" placeholder='Submit'/>


    </form>




  )
}

export default FormMusic