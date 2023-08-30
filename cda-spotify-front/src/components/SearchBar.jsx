import React, { useEffect, useState } from 'react';

const SearchBar = ({ getResult, refresh }) => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getResult(searchQuery)
  }, [searchQuery, refresh])

  // For mobile users
  const handleSubmit = e => {
    e.preventDefault()
    getResult(searchQuery)
  }

  return (
    <form className='w-100 form__field-span position-relative' onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Chercher une musique ou un artiste"
        className='form__field ps-5'
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      <button style={{display: "none"}}>Search</button>
    </form>
  )
}

export default SearchBar;
