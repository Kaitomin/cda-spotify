import { useEffect, useState } from "react"
import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"
import { Link } from "react-router-dom"

import MusicService from "../service/MusicService"
import PlaylistService from "../service/PlaylistService"
import UserService from "../service/UserService"

const Dashboard = () => {
  const [key, setKey] = useState()
  const [musics, setMusics] = useState()
  const [users, setUsers] = useState()
  const [playlists, setPlaylists] = useState()

  const getMusics = () => {
    MusicService.getAll().then((res) => setMusics(res.data))
  }

  const getUsers = () => {
    UserService.getAll().then((res) => setUsers(res.data))
  }

  const getPlaylists = () => {
    PlaylistService.getAll().then((res) => setPlaylists(res.data))
  }

  useEffect(() => {
    getMusics()
    getUsers()
    getPlaylists()
  }, [])

  const deleteMusic = (id, title) => {
    if (confirm(`Supprimer la musique "${title}" ?`)) {
      MusicService.delete(id).then(() => getMusics())
    }
  }

  const deleteUSer = (id, username) => {
    if (confirm(`Supprimer l'utilisateur "${username}" ?`)) {
      UserService.deleteById(id).then(() => {
        getUsers()
        getPlaylists()
      })
    }
  }

  return (
    <div className="dashboard px-3 flex-grow-1">
      <h1>Dashboard</h1>
      <div className="content gap-2">
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3 m-0 p-0 bg-transparent justify-content-start"
        >
          <Tab eventKey="musics" title="Musics">
            <Link
              to="/new-music"
              className="new-music-icon text-center position-fixed d-flex flex-column justify-content-center text-decoration-none align-items-center column-gap-2 my-3 text-light"
            >
              <i className="fa-solid fa-circle-plus bg-black rounded-circle"></i>
              <span>Music</span>
            </Link>
            <table className="w-100 text-center musics-list">
              <thead>
                <tr>
                  <th className="py-3 d-none d-sm-table-cell" width="15%">
                    Image
                  </th>
                  <th className="py-3" width="15%">
                    Artiste
                  </th>
                  <th className="py-3" width="20%">
                    Titre
                  </th>
                  <th className="py-3 d-none d-md-table-cell" width="10%">
                    Durée
                  </th>
                  <th className="py-3 d-none d-sm-table-cell" width="15%">
                    Tags
                  </th>
                  <th className="py-3 d-none d-md-table-cell" width="10%">
                    Sortie
                  </th>
                  <th className="py-3" width="15%">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {musics &&
                  musics.map(
                    ({
                      id,
                      title,
                      artist,
                      duration,
                      tags,
                      releasedAt,
                      imgUri,
                    }) => (
                      <tr key={id}>
                        <td className="py-2 d-none d-sm-table-cell">
                          <img
                            src={`${
                              import.meta.env.VITE_RESOURCE_IMG_URL
                            }/${imgUri}`}
                            alt="music cover image"
                            loading="lazy"
                            className="object-fit-cover"
                            width={60}
                            height={60}
                          />
                        </td>
                        <td className="py-4 py-sm-2">
                          <p className="m-0">{artist}</p>
                        </td>
                        <td>
                          <Link to={`/music/${id}`} className="text-light">
                            {title}
                          </Link>
                        </td>
                        <td className="d-none d-md-table-cell">
                          {duration.split("").splice(1).join("")}
                        </td>
                        <td className="d-none d-sm-table-cell">
                          {tags.join(", ")}
                        </td>
                        <td className="d-none d-md-table-cell">
                          {releasedAt.split("-")[0]}
                        </td>
                        <td className="actions">
                          <Link to={`/update-music/${id}`}>
                            <i className="fa-solid fa-pen-to-square me-3"></i>
                          </Link>
                          <i
                            className="fa-solid fa-trash"
                            onClick={() => deleteMusic(id, title)}
                          ></i>
                        </td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
          </Tab>
          <Tab eventKey="playlists" title="Playlists">
            <table className="w-100 text-center">
              <thead>
                <tr>
                  <th className="py-3">Image</th>
                  <th className="py-3">Nom</th>
                  <th className="py-3">Créée le</th>
                </tr>
              </thead>
              <tbody>
                {playlists &&
                  playlists.map(({ id, musics, name, createdAt }) => (
                    <tr key={id}>
                      <td className="py-2">
                        {musics.length > 0 ? (
                          <img
                            src={`${import.meta.env.VITE_RESOURCE_IMG_URL}/${
                              musics[0]?.imgUri
                            }`}
                            alt="image of the first music in the playlist"
                            loading="lazy"
                            className="object-fit-cover"
                            width={60}
                            height={60}
                          />
                        ) : (
                          <img src="https://placehold.co/60" />
                        )}
                      </td>
                      <td>{name}</td>
                      <td>{createdAt}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </Tab>
          <Tab eventKey="users" title="Users">
            <table className="w-100 text-center">
              <thead>
                <tr>
                  <th className="py-3">Avatar</th>
                  <th className="py-3">Nom</th>
                  <th className="py-3">Role</th>
                  <th className="py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map(({ id, username, role }) => (
                    <tr key={id}>
                      <td className="py-2">
                        <i className="fa-solid fa-user"></i>
                      </td>
                      <td>{username}</td>
                      <td>{role}</td>
                      <td className="actions">
                        <i
                          className="fa-solid fa-pen-to-square me-3"
                          // onClick={() => displayForm(id, "user")}
                        ></i>
                        <i
                          className="fa-solid fa-trash"
                           onClick={() => deleteUSer(id, username)}
                        ></i>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

export default Dashboard
