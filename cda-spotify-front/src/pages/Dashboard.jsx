import { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [key, setKey] = useState('musics')
  const [musics, setMusics] = useState()
  const [users, setUsers] = useState()
  const [playlists, setPlaylists] = useState()


  const getMusics = () => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/music`)
    .then(res => setMusics(res.data))
  }

  const getUsers = () => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user`)
      .then(res => setUsers(res.data))
  }

  useEffect(() => {
    getMusics()
  }, [])

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/playlist`)
      .then(res => setPlaylists(res.data))
  }, [])
  
  const deleteMusic = id => {
    if (confirm("Supprimer cette musique ?")) {
      axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/music/delete/${id}`)
        .then(() => getMusics())
    }
  }

  return (
    <div className='dashboard'>
      <h1>Dashboard</h1>
      <div className='content gap-2 px-2'>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={k => setKey(k)}
          className="mb-3 m-0 p-0 bg-transparent justify-content-start"
        >
          <Tab eventKey="musics" title="Musics">
            <Link to="/new-music" className='new-music-icon text-center d-flex flex-column justify-content-center text-decoration-none align-items-center column-gap-2 my-3'>
              <i className="fa-solid fa-circle-plus"></i>
              <span>Music</span>
            </Link>
            <table className='w-100 text-center'>
              <thead>
                <tr>
                  <th className='py-4'>Image</th>
                  <th className='py-4'>Artiste</th>
                  <th className='py-4'>Titre</th>
                  <th className='py-4'>Durée</th>
                  <th className='py-4'>Sortie</th>
                  <th className='py-4'>Actions</th>
                </tr>
              </thead>
              <tbody>
                { musics && musics.map(m => (
                  <tr key={m.id} className="">
                    <td className='py-3'>
                      <img src={`${import.meta.env.VITE_BACKEND_URL}/img/${m.imgUri}`} alt="music cover" width={75} height={75} />
                    </td>
                    <td>{m.artist}</td>
                    <td>{m.title}</td>
                    <td>{m.duration}</td>
                    <td>{m.releasedAt}</td>
                    <td className='actions'>
                      <Link to={`/update-music/${m.id}`}>
                        <i className="fa-solid fa-pen-to-square text-primary me-3"></i>
                      </Link>
                      <i className="fa-solid fa-trash text-danger" onClick={() => deleteMusic(m.id)}></i>
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
                    <th className='py-4'>Image</th>
                    <th className='py-4'>Nom</th>
                    <th className='py-4'>Créée le</th>
                  </tr>
                </thead>
                <tbody>
                  { playlists && playlists.map(p => (
                    <tr key={p.id}>
                      <td className='py-3'>
                        {p.musics.length > 0 ? (<img src={`${import.meta.env.VITE_BACKEND_URL}/img/${p.musics[0]?.imgUri}`} alt="" width={75} height={75} />) : null}
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
                  <th className='py-4'>Avatar</th>
                  <th className='py-4'>Nom</th>
                  <th className='py-4'>Role</th>
                  <th className='py-4'>Actions</th>
                </tr>
              </thead>
              <tbody>
                { users && users.map(u =>(
                  <tr key={u.id}>
                    <td className='py-3'><i className="fa-solid fa-user"></i></td>
                    <td>{u.username}</td>
                    <td>{u.role}</td>
                    <td className='actions'>
                      <i className="fa-solid fa-pen-to-square text-primary me-3" onClick={() => displayForm(m.id, "user")}></i>
                      <i className="fa-solid fa-trash text-danger" onClick={() => deleteUser(m.id)}></i>
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