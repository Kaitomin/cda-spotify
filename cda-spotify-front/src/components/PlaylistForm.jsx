import React, { useState } from 'react';

const PlaylistForm = ({ playlistName, handlePlaylist }) => {
    const [newName, setNewName] = useState(playlistName ? playlistName : '');

    const handleChange = e => {
        setNewName(e.target.value);
    }
    const handleSubmit = e => {
        e.preventDefault();
        handlePlaylist(newName)
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

export default PlaylistForm;
