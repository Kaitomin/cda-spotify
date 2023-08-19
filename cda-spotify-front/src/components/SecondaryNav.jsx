import React from 'react'
import { Link } from 'react-router-dom'

const SecondaryNav = () => {
  return (
    <nav className='secondary-nav position-fixed bottom-0 w-100 border-top border-1'>
      <ul className='d-flex justify-content-around d-sm-none m-0 py-3 px-0'>
        <Link to="/"><i className="fa-solid fa-house"></i></Link>
        <Link to="/search"><i className="fa-solid fa-magnifying-glass"></i></Link>
        <Link to="/account"><i className="fa-solid fa-user"></i></Link>
        <Link to="/dashboard"><i className="fa-solid fa-gauge"></i></Link>
      </ul>
    </nav>
  )
}

export default SecondaryNav