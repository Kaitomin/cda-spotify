import { useState } from 'react'
import PropTypes from 'prop-types'

const PlaylistForm = ({ playlistName, handlePlaylist, setShowModal, title }) => {
    const [newName, setNewName] = useState(playlistName ? playlistName : '')

    const handleChange = e => {
        setNewName(e.target.value)
    }
    const handleSubmit = e => {
        e.preventDefault();
        handlePlaylist(newName)
    }

    return (
        <div className='edit-playlist-modal'>
            <p>{title}</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor='playlist-name'></label>
                <input type="text" id='playlist-name' name='playlist-name' placeholder="Nom de la playlist..." value={newName} onChange={handleChange} autoFocus />
                <div className='interaction'>
                    <button type="submit" className='flex-grow-1'><i className="fa-solid fa-square-check"></i></button>
                    <div className='separator'></div>
                    <i onClick={() => setShowModal(false)} className="fa-solid fa-circle-xmark flex-grow-1"></i>
                </div>
            </form>

        </div>
    )
}

PlaylistForm.propTypes = {
    playlistName: PropTypes.string,
    handlePlaylist: PropTypes.func,
    setShowModal: PropTypes.func,
    title: PropTypes.string
}

export default PlaylistForm;
