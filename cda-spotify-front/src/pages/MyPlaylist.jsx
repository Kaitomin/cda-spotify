import React, { useEffect, useState } from 'react';
import FormMusic from "../components/FormMusic"
import { Link } from 'react-router-dom';

const MyPlaylist = () => {
    const [playlists, setPlaylists] = useState([]);
    
    useEffect(() => {
      const fakeAPIResponse = [
        { id: 1, title: 'Playlist 1', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8DzclOB1_ThxlwT7B85FB6-ZyZfsbODL9Cw&usqp=CAU' },
        { id: 2, title: 'Playlist 2', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSybeCQhUBLzH8bCd_HC2xax1V5jAVqkC54AQ&usqp=CAU' },
        { id: 3, title: 'Playlist 3', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSybeCQhUBLzH8bCd_HC2xax1V5jAVqkC54AQ&usqp=CAU' },
        { id: 4, title: 'Playlist 4', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSybeCQhUBLzH8bCd_HC2xax1V5jAVqkC54AQ&usqp=CAU' },
        { id: 5, title: 'Playlist 5', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSybeCQhUBLzH8bCd_HC2xax1V5jAVqkC54AQ&usqp=CAU' },
        { id: 6, title: 'Playlist 6', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSybeCQhUBLzH8bCd_HC2xax1V5jAVqkC54AQ&usqp=CAU' },
        { id: 7, title: 'Playlist 7', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSybeCQhUBLzH8bCd_HC2xax1V5jAVqkC54AQ&usqp=CAU' },
        { id: 8, title: 'Playlist 8', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSybeCQhUBLzH8bCd_HC2xax1V5jAVqkC54AQ&usqp=CAU' },
        { id: 9, title: 'Playlist 9', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSybeCQhUBLzH8bCd_HC2xax1V5jAVqkC54AQ&usqp=CAU' },
        { id: 10, title: 'Playlist 10', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSybeCQhUBLzH8bCd_HC2xax1V5jAVqkC54AQ&usqp=CAU' },

      ];
      setPlaylists(fakeAPIResponse);
    }, []);

  return (
    <div className="MyPlayslist-body">

      <h1 className='text-center pt-5'>Vos Playlists</h1>
      <div className="playlist-container">
        {playlists.map((playlist) => (
          <Link to={`/playlist/${playlist.id}`} key={playlist.id} className="playlist-item">
            <img src={playlist.imageUrl} alt={playlist.title} className="playlist-image" />
            <p className="playlist-title">{playlist.title}</p>
          </Link>
        ))}
      </div>

    </div>

  )
}

export default MyPlaylist