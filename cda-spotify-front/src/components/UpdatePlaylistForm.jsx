import React, { useState } from 'react';

const UpdatePlaylistForm = ( { playlistName, handleUpdatePlaylist }) => {
    const [newName, setNewName] = useState(playlistName);

    const update = (e)=>{
        setNewName(e.target.value);
    }
    const handleUpdate =  (e) =>{
        e.preventDefault();
        handleUpdatePlaylist(newName)
    }

    return (
        <div className='edit-playlist-modal'>
            <form onSubmit={handleUpdate} >
                <input type="text" placeholder="Nouveau nom de la playlist" value={newName} onChange={update} autoFocus />
                <button type="submit">Modifier le nom</button>
            </form>
        </div>
    ) 
}

export default UpdatePlaylistForm;
