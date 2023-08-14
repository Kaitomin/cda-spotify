import React, { useState } from 'react';

const UpdatePlaylistForm = ( { newPlaylistName, handleUpdatePlaylist }
    ) => {
        const [newName, setNewName] = useState("");

        const update = (e)=>{
            setNewName(e.target.value);
        }
        const handleUpdate =  (e) =>{
            e.preventDefault();
            handleUpdatePlaylist(newName)
        }
        
    //console.log('je suis dans la modal')
  return (
    <div className=''>

        <form onSubmit={handleUpdate} >
            <input type="text" placeholder="Nouveau nom de la playlist"  onChange={update}/>
            <button type="submit">Modifier le nom</button>
        </form>
    </div>
  );
};

export default UpdatePlaylistForm;
