import { useState } from 'react'
import PropTypes from 'prop-types'

const PlaylistForm = ({ playlistName, handlePlaylist, setShowModal}) => {
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
                    <div className='interaction'>
                        <button type="submit"><i class="fa-solid fa-square-check"></i></button>
                        <i onClick={() => setShowModal(false)} class="fa-solid fa-circle-xmark"></i>
                    </div>
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
