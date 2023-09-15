import PropTypes from 'prop-types'
import { Link } from "react-router-dom"

const SliderCard = ({id, title, imgUri}) => {
  return (
    <div>
      <Link to={`/music/${id}`} className='text-decoration-none'>
        <div className="slider-music-component">
          <img
            src={`${import.meta.env.VITE_RESOURCE_IMG_URL}/${
              imgUri
            }`}
            alt={`${title}`}
          />
          <h3 className="slider-music-title my-3">{title}</h3>
        </div>
      </Link>
    </div>
  )
}

SliderCard.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  imgUri: PropTypes.string
}

export default SliderCard