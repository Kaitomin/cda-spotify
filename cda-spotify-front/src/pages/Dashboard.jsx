import { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Link } from 'react-router-dom';
import MusicService from '../service/MusicService';
import PlaylistService from '../service/PlaylistService';
import UserService from '../service/UserService';

const Dashboard = () => {
  const [key, setKey] = useState()
  const [musics, setMusics] = useState()
  const [users, setUsers] = useState()
  const [playlists, setPlaylists] = useState()

  const getMusics = () => {
    MusicService.getAll()
      .then(res => setMusics(res.data))
  }

  const getUsers = () => {
    UserService.getAll()
      .then(res => setUsers(res.data))
  }

  useEffect(() => {
    getMusics()
  }, [])

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    PlaylistService.getAll()
      .then(res => setPlaylists(res.data))
  }, [])
  
  const deleteMusic = id => {
    if (confirm("Supprimer cette musique ?")) {
      MusicService.delete(id)
        .then(() => getMusics())
    }
  }

  return (
    <div className='dashboard px-3 flex-grow-1'>
      <h1>Dashboard</h1>
      <div className='content gap-2'>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={k => setKey(k)}
          className="mb-3 m-0 p-0 bg-transparent justify-content-start"
        >
          <Tab eventKey="musics" title="Musics">
            <Link to="/new-music" className='new-music-icon text-center position-fixed d-flex flex-column justify-content-center text-decoration-none align-items-center column-gap-2 my-3 text-light'>
              <i className="fa-solid fa-circle-plus bg-black rounded-circle"></i>
              <span>Music</span>
            </Link>
            <table className='w-100 text-center musics-list'>
              <thead>
                <tr>
                  <th className='py-3 d-none d-sm-table-cell' width="15%">Image</th>
                  <th className='py-3' width="15%">Artiste</th>
                  <th className='py-3' width="20%">Titre</th>
                  <th className='py-3 d-none d-md-table-cell' width="10%">Durée</th>
                  <th className='py-3 d-none d-sm-table-cell' width="15%">Tags</th>
                  <th className='py-3 d-none d-md-table-cell' width="10%">Sortie</th>
                  <th className='py-3' width="15%">Actions</th>
                </tr>
              </thead>
              <tbody>
                { musics && musics.map(m => (
                  <tr key={m.id}>
                    <td className='py-2 d-none d-sm-block'>
                      <img src={`${import.meta.env.VITE_RESOURCE_IMG_URL}/${m.imgUri}`} alt="music cover image" loading='lazy' className='object-fit-cover' width={60} height={60} />
                    </td>
                    <td className='py-4 py-sm-2'><p className='m-0'>{m.artist}</p></td>
                    <td>
                      <Link to={`/music/${m.id}`} className='text-light'>
                        {m.title}
                      </Link>
                    </td>
                    <td className='d-none d-md-table-cell'>{m.duration.split('').splice(1).join('')}</td>
                    <td className='d-none d-sm-table-cell'>{m.tags.join(', ')}</td>
                    <td className='d-none d-md-table-cell'>{m.releasedAt.split('-')[0]}</td>
                    <td className='actions'>
                      <Link to={`/update-music/${m.id}`}>
                        <i className="fa-solid fa-pen-to-square me-3"></i>
                      </Link>
                      <i className="fa-solid fa-trash" onClick={() => deleteMusic(m.id)}></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Tab>
          <Tab eventKey="playlists" title="Playlists">
            <table className='w-100 text-center'>
                <thead>
                  <tr>
                    <th className='py-3'>Image</th>
                    <th className='py-3'>Nom</th>
                    <th className='py-3'>Créée le</th>
                  </tr>
                </thead>
                <tbody>
                  { playlists && playlists.map(p => (
                    <tr key={p.id}>
                      <td className='py-2'>
                        {p.musics.length > 0 ? (<img src={`${import.meta.env.VITE_RESOURCE_IMG_URL}/${p.musics[0]?.imgUri}`} alt="image of the first music in the playlist" loading='lazy' className='object-fit-cover' width={60} height={60} />) : <img src="https://placehold.co/60" /> }
                      </td>
                      <td>{p.name}</td>
                      <td>{p.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
            </table>
          </Tab>
          <Tab eventKey="users" title="Users">
            <table className='w-100 text-center'>
              <thead>
                <tr>
                  <th className='py-3'>Avatar</th>
                  <th className='py-3'>Nom</th>
                  <th className='py-3'>Role</th>
                  <th className='py-3'>Actions</th>
                </tr>
              </thead>
              <tbody>
                { users && users.map(u =>(
                  <tr key={u.id}>
                    <td className='py-2'><i className="fa-solid fa-user"></i></td>
                    <td>{u.username}</td>
                    <td>{u.role}</td>
                    <td className='actions'>
                      <i className="fa-solid fa-pen-to-square me-3" onClick={() => displayForm(m.id, "user")}></i>
                      <i className="fa-solid fa-trash" onClick={() => deleteUser(m.id)}></i>
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