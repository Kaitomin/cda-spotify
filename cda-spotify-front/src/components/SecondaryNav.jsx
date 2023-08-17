import React from 'react'
import { Link } from 'react-router-dom'

const SecondaryNav = () => {
  return (
    <nav className='secondary-nav position-fixed bottom-0 w-100 border-top border-1'>
      <ul className='d-flex justify-content-around d-sm-none m-0 py-3 px-0'>
        {/* <div className="">
          { !isFavorite && <i className="fa-regular fa-heart" onClick={addToFavorite}></i> }
          { isFavorite && <i className="fa-solid fa-heart" onClick={removeToFavorite}></i> }
          
          <div>
            <i className="fa-solid fa-circle-plus" onClick={() => setShowModal(true)}></i>
            { showModal &&
              <div className='playlist-modal'>
                  <p>Ajouter à ...</p>
                  { playlists && playlists.map(p => (
                    <div key={p.id} onClick={() => addToPlaylist(p.id)}>{p.name}</div>
                  ))}
                  <div onClick={() => setShowModal(false)}>
                    <i className="fa-solid fa-circle-xmark"></i>
                  </div>
              </div>
            }
          </div>
          <i className="fa-solid fa-share"></i>
        </div> */}
        {/* <div className='d-flex justify-content-around'>
          <li><i className="fa-regular fa-heart"></i></li>
          <li><i className="fa-solid fa-circle-plus"></i></li>
          <li><i className="fa-solid fa-share"></i></li>
        </div> */}
        <Link to="/"><i className="fa-solid fa-house"></i></Link>
        <Link to="/search"><i className="fa-solid fa-magnifying-glass"></i></Link>
        <Link to="/account"><i className="fa-solid fa-user"></i></Link>
        <Link to="/dashboard"><i className="fa-solid fa-gauge"></i></Link>
      </ul>
    </nav>
  )
}

export default SecondaryNav