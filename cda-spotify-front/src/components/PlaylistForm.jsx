import { useState } from 'react'
import PropTypes from 'prop-types'
import { sanitizeInput } from '../utils/CustomFunctions'


const PlaylistForm = ({ playlistName, handlePlaylist, setShowModal}) => {
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
        <div>
            <div className='edit-playlist-modal'>
                <p>Modifier le nom</p>
                <form onSubmit={handleSubmit} >
                    <input type="text" id='playlistName' name='playlistName' placeholder="Nom de la playlist ..." value={newName} onChange={handleChange} autoFocus 
                    className=''
                    />
                    {errors.playlistName && <div className="error-message p-2 text-danger">{errors.playlistName}</div>}
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
