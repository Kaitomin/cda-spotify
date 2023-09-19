import { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'

import { sanitizeInput } from "../utils/CustomFunctions"

const SearchForm = ({ getResult, refresh }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const inputRef = useRef()

  // Debouncer
  useEffect(() => {
    const err = sanitizeInput(searchQuery, "search")

    if (err) return

    const sendQuery = setTimeout(() => {
      getResult(searchQuery)
    }, 500)

    return () => {
      clearTimeout(sendQuery)
    }
  }, [searchQuery, refresh])

  // For mobile users
  const handleSubmit = e => {
    e.preventDefault()

    const err = sanitizeInput(searchQuery, "search")
    if (err) return

    getResult(searchQuery)
    inputRef.current.blur()
  }

  return (
    <form className='w-100 form__field-span position-relative' onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Chercher une musique ou un artiste"
        className='form__field ps-5'
        value={searchQuery}
        ref={inputRef}
        onChange={e => setSearchQuery(e.target.value)}
      />
      <button style={{display: "none"}}>Search</button>
    </form>
  )
}

SearchForm.propTypes = {
  getResult: PropTypes.func,
  refresh: PropTypes.bool
}

export default SearchForm;
