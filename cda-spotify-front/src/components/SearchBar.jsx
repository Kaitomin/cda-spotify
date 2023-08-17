import React, { useState } from 'react';
import MusicService from '../service/MusicService';

const SearchBar = ({getResult}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = e => {
    e.preventDefault()

    MusicService.searchBy(searchQuery)
      .then(response => getResult(response.data))
  }

  return (
    <form onSubmit={handleSearch} className='search-form'>
      <input type="text" placeholder="recherche" value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}/>
      <button>Rechercher</button>
    </form>
  );
};

export default SearchBar;
