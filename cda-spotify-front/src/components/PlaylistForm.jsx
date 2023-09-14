import { useState } from 'react'
import PropTypes from 'prop-types'
import { sanitizeInput } from '../utils/CustomFunctions'

const PlaylistForm = ({ playlistName, handlePlaylist, setShowModal, title }) => {
    const [newName, setNewName] = useState(playlistName ? playlistName : '')
    const [errors, setErrors] = useState({
        playlistName:""
    })

    const handleChange = e => {
        const { name, value } = e.target;
        setNewName(value);
        // setNewName(e.target.value)

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: sanitizeInput(value, name),
        }));

    }
    const handleSubmit = e => {
        e.preventDefault();
        let hasError = sanitizeInput(newName, 'playlistName');
        if (hasError) {
            setErrors(prevErrors => ({
                ...prevErrors,
                playlistName: hasError,
            }))
        }

        handlePlaylist(newName)
    }

    return (
        <div className='edit-playlist-modal'>
            <p>{title}</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor='playlistName'></label>
                <input type="text" id='playlistName' name='playlistName' placeholder="Nom de la playlist..." value={newName} onChange={handleChange} autoFocus />
                {errors.playlistName && <div className="error-message p-2 text-danger">{errors.playlistName}</div>}
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
