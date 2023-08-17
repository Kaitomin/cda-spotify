import React, { useEffect, useState } from 'react';

const SearchBar = ({ getResult, refresh }) => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // if (!searchQuery) return

    getResult(searchQuery)
  }, [searchQuery, refresh])

  return (
    <span className='w-100 form__field-span position-relative'>
      <input 
        type="text" 
        placeholder="Chercher une musique ou un artiste"
        className='form__field ps-5'
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
       />
    </span>
  )
}

export default SearchBar;
