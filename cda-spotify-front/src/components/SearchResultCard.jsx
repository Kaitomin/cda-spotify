import PropTypes from 'prop-types'
import { Link } from "react-router-dom"

const SearchResultCard = ({ id, title, artist, imgUri, index }) => {
  return (
    <Link
      to={`/music/${id}`}
      key={id}
      className="text-decoration-none text-black"
    >
    <div className="h-100 bg-white rounded">
      <img
        src={`${import.meta.env.VITE_RESOURCE_IMG_URL}/${
          imgUri
        }`}
        alt={title}
        loading={index > 6 ? "lazy" : "eager"}
        className="rounded-top object-fit-cover"
        width={100 + "%"}
        height={150}
      />
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
  </Link>
  )
}

SearchResultCard.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  artist: PropTypes.string,
  imgUri: PropTypes.string,
  index: PropTypes.number
}

export default SearchResultCard