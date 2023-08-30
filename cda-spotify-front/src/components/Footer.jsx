import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    // <footer className='position-fixed bottom-0 w-100 p-1 d-none d-sm-block'>
    <footer className='w-100 p-1 mt-4 d-none d-sm-block'>
      <div className='d-flex justify-content-around'>
        <span>©2023 Streamy</span> 
        <span>-</span>
        <Link to='/about-us' className='text-light'>A propos</Link>
        <span>-</span>
        <Link to='/contact' className='text-light'>Contact</Link>
      </div>
    </footer>
  )
}

export default Footer