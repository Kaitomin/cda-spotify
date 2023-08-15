import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormMusic from "../components/FormMusic"
import Playlist from '../components/Playlist';
import UpdatePlaylistForm from '../components/UpdatePlaylistForm';
//import { update } from 'lodash';

const DetailedPlaylist = () => {
  //const [playlist, setPlaylist] = useState([]);
  const [musicList, setMusicList] = useState([]);
  const [playlist, setPlaylist] = useState();
  const [currentMusic, setCurrentMusic] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [newPlaylistName, setNewPlaylistName] = useState("");


    const getPlaylist = () => {
        axios.get('http://localhost:8080/api/playlist/3')
            .then(response => {
                const data = response.data;
                if (data.musics && data.musics.length > 0) {
                setMusicList(data.musics); 
                setPlaylistName(data.name);
                setPlaylist(data);
                }
            });
    }
    useEffect(() => {
        getPlaylist()
    }, []);


    const handleDelete = (id) =>{
        axios.post(`http://localhost:8080/api/playlist/3/removeMusic/${id}`)
        .then(getPlaylist())
    }
    const handleUpdatePlaylist = (childName) => {
        const newPlaylistData = {
            ...playlist,
            name:childName,
            createdAt:"2012-04-23T18:25:43.511Z"

        }
        console.log(newPlaylistData);
        axios.post(`http://localhost:8080/api/user/1/updatePlaylist`,  newPlaylistData)
          .then(() =>{
              console.log('premier niveau');
            getPlaylist();
            setNewPlaylistName("");
            setIsModalOpen(false);

          } 
          )
  
      };


  return (
    <div>
        <div className="playlist-page">
        <h1>Ma Playlist</h1>
        <h2>{playlistName}</h2>
        <button onClick={() => setIsModalOpen(true)}>Modifier le nom</button>
        {isModalOpen && (
            <div className=''>
                <UpdatePlaylistForm newPlaylistName={newPlaylistName} handleUpdatePlaylist={handleUpdatePlaylist} />
                <button onClick={() => setIsModalOpen(false)}>Fermer</button>
            </div>
         )} 
        <div className="music-list">
        {musicList && musicList.map((music) => (
            <div key={music.id} className="music-item">
                <img src={music.imageUrl} alt={music.title} className="music-image" />
                <div className="music-details">
                <p className="music-title">{music.title}</p>
                <p className="music-author">{music.author}</p>
                </div>
                <button className="delete-button" onClick={() => handleDelete(music.id)}>Supprimer</button>
            </div>
            ))}
        </div>
        </div>
    </div>
  )
}

export default DetailedPlaylist