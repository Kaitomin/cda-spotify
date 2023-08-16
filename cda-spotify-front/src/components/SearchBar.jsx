import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({getResult}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/music/search/${searchQuery}`)
      .then(response => {
         getResult(response.data);
      })

    console.log(searchQuery);
  };

  return (
    <div>
      <h1>Recherche</h1>
      <input type="text" placeholder="recherche" value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}/>
      <button onClick={handleSearch}>Rechercher</button>
    </div>
  );
};

export default SearchBar;
