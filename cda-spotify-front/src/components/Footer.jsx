import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className='w-100 p-1 mt-4 d-none d-sm-block'>
      <div className='d-flex justify-content-around'>
        <span>©{year} Streamy</span>
        <span>-</span>
        <span>Tous droits réservés (ou pas)</span>
        <span>-</span>
        <Link to='/about-us' className='text-light'>A propos</Link>
        <span>-</span>
        <Link to='/contact' className='text-light'>Contact</Link>
      </div>
    </footer>
  )
}

export default Footer