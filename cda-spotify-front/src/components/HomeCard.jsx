import { Link } from "react-router-dom"
import PropTypes from "prop-types"

const HomeCard = ({ id, title, imgUri, artist }) => {
  return (
    <Link to={`/music/${id}`} className=" text-decoration-none text-black">
      <div className="home-card-link">
        <img
          src={`${import.meta.env.VITE_RESOURCE_IMG_URL}/${imgUri}`}
          alt={title}
          className="home-card-img"
          width={50 + "%"}
          height={100}
        />
        <div className="px-2 d-flex flex-column justify-content-center overflow-hidden">
          <h2 className="fw-bold mt-2" title={title}>
            {title}
          </h2>
          <h3 title={artist}>{artist}</h3>
        </div>
      </div>
    </Link>
  )
}

HomeCard.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  imgUri: PropTypes.string,
  artist: PropTypes.string,
}

export default HomeCard
