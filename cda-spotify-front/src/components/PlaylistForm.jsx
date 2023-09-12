import { useState } from 'react'
import PropTypes from 'prop-types'

const PlaylistForm = ({ playlistName, handlePlaylist }) => {
    const [newName, setNewName] = useState(playlistName ? playlistName : '')

    const handleChange = e => {
        setNewName(e.target.value)
    }
    const handleSubmit = e => {
        e.preventDefault();
        handlePlaylist(newName)
    }

    return (
        <div>
            <div className='edit-playlist-modal'>
                <p>Modifier le nom</p>
                <form onSubmit={handleSubmit} >
                    <input type="text" placeholder="Nom de la playlist ..." value={newName} onChange={handleChange} autoFocus />
                    <button type="submit">Attribuer le nom</button>
                </form>
                
            </div>
        </div>
    )
}

PlaylistForm.propTypes = {
    playlistName: PropTypes.string,
    handlePlaylist: PropTypes.func
}

export default PlaylistForm;
