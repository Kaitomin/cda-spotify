import { Link } from 'react-router-dom'

import useAuth from "../hook/useAuth"

const Footer = () => {
  const year = new Date().getFullYear()
  const { isCookieBannerHidden, hideCookieBanner } = useAuth()

  const handleCookie = () => {
    hideCookieBanner(!isCookieBannerHidden)
  }

  return (
    <footer className='w-100 p-1 mt-4 d-none d-sm-block'>
      <div className='d-flex justify-content-around align-items-center'>
        <span>©{year} Streamy</span>
        <span>-</span>
        <span>Tous droits réservés (ou pas)</span>
        <span>-</span>
        <Link to='/about-us' className='text-light'>A propos</Link>
        <span>-</span>
        <Link to='/contact' className='text-light'>Contact</Link>
        <span>-</span>
        <i className="fa-solid fa-cookie-bite" onClick={handleCookie}></i>
      </div>
    </footer>
  )
}

export default Footer