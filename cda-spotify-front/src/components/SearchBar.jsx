import React, { useEffect, useState } from 'react';
import MusicService from '../service/MusicService';

const SearchBar = ({ getResult, refresh }) => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!searchQuery) return

    getResult(searchQuery)
  }, [searchQuery, refresh])

  return (
    <input 
      type="text" 
      placeholder="Chercher une musique ou un artiste"
      className='w-100'
      value={searchQuery}
      onChange={e => setSearchQuery(e.target.value)}
    />
  )
}

export default SearchBar;
