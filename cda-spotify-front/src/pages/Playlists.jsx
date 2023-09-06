import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import PlaylistService from "../service/PlaylistService"
import UserService from "../service/UserService"
import PlaylistForm from "../components/PlaylistForm"
import useAuth from "../hook/useAuth"

const Playlists = () => {
  const [playlists, setPlaylists] = useState([])
  const [showModal, setShowModal] = useState(false)
  const { currentUser } = useAuth()

  const getPlaylists = () => {
    PlaylistService.getPlaylistByUserId(currentUser.id).then((res) => {
      setPlaylists(res.data)
    })
  }

  useEffect(() => {
    getPlaylists()
  }, [])

  const addNewPlaylistToUser = (newPlaylistName) => {
    UserService.addPlaylist(currentUser.id, { name: newPlaylistName }).then(
      () => {
        getPlaylists()
        setShowModal(false)
      }
    )
  }

  const removePlaylistFromUser = (playlistId) => {
    if (!confirm("Supprimer cette playlist ?")) return

    UserService.deletePlaylist(currentUser.id, playlistId).then(() =>
      getPlaylists()
    )
  }

  return (
    <div className="my-playlist px-3 flex-grow-1">
      <h1>Playlists</h1>
      <div className="playlist-container mb-5">
        {playlists.map(({ id, musics, name }) => (
          <div
            key={id}
            className="playlist-item position-relative text-decoration-none text-black"
          >
            <Link to={`/playlist/${id}`} className="text-decoration-none">
              <img
                src={
                  musics.length > 0
                    ? `${import.meta.env.VITE_RESOURCE_IMG_URL}/${
                        musics[0].imgUri
                      }`
                    : "https://placehold.co/400x350"
                }
                alt={name}
                className="playlist-image w-100 h-100 object-fit-cover"
              />

              <h2 className="playlist-title bg-white text-black text-center fw-bolder px-3 py-1">
                {name}
              </h2>
            </Link>
            {name !== "Favoris" && (
              <i
                className="fa-solid fa-xmark"
                onClick={() => removePlaylistFromUser(id)}
              ></i>
            )}
          </div>
        ))}
      </div>
      <p>
        <i
          className="fa-solid fa-circle-plus me-2"
          onClick={() => setShowModal(true)}
        ></i>
        Créer une playlist
      </p>
      {showModal && (
        <div className="modal-window">
          <PlaylistForm handlePlaylist={addNewPlaylistToUser} />
          <button onClick={() => setShowModal(false)}>Annuler</button>
        </div>
      )}
    </div>
  )
}

export default Playlists
