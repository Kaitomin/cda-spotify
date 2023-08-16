import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({getResult}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = e => {
    e.preventDefault()

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/music/search/${searchQuery}`)
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
