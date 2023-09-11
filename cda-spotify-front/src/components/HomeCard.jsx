import React from 'react'
import { Link } from 'react-router-dom';

const HomeCard = ({id,title, imgUri, artist}) => {
    console.log("test");
  return (
    <Link to={`/music/${id}`} className=" text-decoration-none text-black">
    <div className="home-card-link" >
      <img src={`${import.meta.env.VITE_RESOURCE_IMG_URL}/${imgUri  }`}
        alt={title}
        className="home-card-img"
        width={50 + "%"}
        height={100}
      />
      <div className='ps-2'>
        <h2
            className="fw-bold mt-2"
            title={title}
        >
            {title}
        </h2>
        <h3 title={artist}>
            {artist}
        </h3>
      </div>
    </div>
  </Link>



  )
}

export default HomeCard