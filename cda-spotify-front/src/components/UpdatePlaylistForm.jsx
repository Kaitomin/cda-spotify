import React, { useState } from 'react';

const UpdatePlaylistForm = ({ playlistName, handleUpdatePlaylist }) => {
    const [newName, setNewName] = useState(playlistName);

    const handleChange = e => {
        setNewName(e.target.value);
    }
    const handleSubmit = e => {
        e.preventDefault();
        handleUpdatePlaylist(newName)
    }

    return (
        <div className='edit-playlist-modal'>
            <form onSubmit={handleSubmit} >
                <input type="text" placeholder="Nouveau nom de la playlist" value={newName} onChange={handleChange} autoFocus />
                <button type="submit">Modifier le nom</button>
            </form>
        </div>
    ) 
}

export default UpdatePlaylistForm;
